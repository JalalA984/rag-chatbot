import { GoogleGenerativeAI } from "@google/generative-ai";
import { DataAPIClient } from "@datastax/astra-db-ts";
import OpenAI from "openai";

const {
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  GEMINI_API_KEY,
} = process.env;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

const openai = new OpenAI({
  apiKey: GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, { namespace: ASTRA_DB_NAMESPACE });

export default async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages?.length - 1]?.content;

    let docContext = "";

    const embeddingResult = await model.embedContent(latestMessage);
    const vector = embeddingResult.embedding.values;

    try {
      const collection = await db.collection(ASTRA_DB_COLLECTION);
      const cursor = collection.find(null, {
        sort: {
          $vector: vector,
        },
        limit: 10,
      });

      const documents = cursor.toArray();

      const docsMap = (await documents)?.map((doc) => doc.text);
      docContext = JSON.stringify(docsMap);
    } catch (err) {
      console.log(err);
      docContext = "";
    }

    const template = {
      role: "system",
      content: `You are an AI assistant who knows everything about Computer Science and tech. Use the below context to augment what you know about Computer Science. The context will provide you
        with the most recent page data from wikipedia articles. If the context doesn't include the information you need, answer based on your existing knowledge and don't mention the source of your
        information or what the context does or doesn't include. Format responses using markdown where applicable and don't return images.
        ---------------
        START CONTEXT
        ${docContext}
        END CONTEXT
        ---------------
        QUESTION: ${latestMessage}
        ---------------
        `,
    };

    const response = await openai.chat.completions.create({
      model: "gemini-1.5-flash",
      messages: [template, ...messages]
    })

    const stream = // stream the response
    return new // return stream as text

  } catch (err) {
    throw err;
  }
}
