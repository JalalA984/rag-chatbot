import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { DataAPIClient } from "@datastax/astra-db-ts";

const {
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  GEMINI_API_KEY,
} = process.env;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });
const chatModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    console.log('Received messages:', messages);

    const latestMessage = messages[messages.length - 1]?.content;
    if (!latestMessage) {
      console.log('No latest message found.');
      return res.status(400).json({ error: 'No message content provided' });
    }

    console.log('Latest message:', latestMessage);
    let docContext = "";

    const embeddingResult = await embeddingModel.embedContent(latestMessage);
    const vector = Array.from(embeddingResult.embedding.values);

    try {
      const collection = await db.collection(ASTRA_DB_COLLECTION);
      const cursor = collection.find(
        {},
        {
          sort: {
            $vector: vector
          },
          limit: 10,
          includeSimilarity: true
        }
      );

      const documents = await cursor.toArray();

      const docsMap = documents?.map((doc) => ({
        text: doc.text,
        similarity: doc.$similarity
      }));
      docContext = JSON.stringify(docsMap);

    } catch (err) {
      console.error("Error fetching context:", err);
      docContext = "";
    }

    const systemPrompt = `You are an AI assistant who knows everything about Computer Science and tech. Use the below context to augment what you know about Computer Science. The context will provide you
      with the most recent page data from wikipedia articles. If the context doesn't include the information you need, answer based on your existing knowledge and don't mention the source of your
      information or what the context does or doesn't include. Format responses using markdown where applicable and don't return images.
      ---------------
      START CONTEXT
      ${docContext}
      END CONTEXT
      ---------------`;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const result = await chatModel.generateContentStream({
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] },
        ...messages.map(msg => ({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.content }] }))
      ],
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });

    console.log('Starting to stream response...');
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
    }

    res.end();
    console.log('Response streaming ended.');

  } catch (err) {
    console.error('Error in chat API:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
