import "dotenv/config";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { GoogleGenerativeAI  } from "@google/generative-ai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";

type SimilarityMetric = "dot_product" | "cosine" | "euclidean"

const {
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  GEMINI_API_KEY,
} = process.env;

/*
const openai = new OpenAI({
    apiKey: GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});
*/
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "text-embedding-004"});

const chatbotData = [
    "https://en.wikipedia.org/wiki/Computer_science",
    "https://en.wikipedia.org/wiki/Software_engineering",
    "https://en.wikipedia.org/wiki/Data_structure",
    "https://en.wikipedia.org/wiki/Algorithm",
    "https://en.wikipedia.org/wiki/Programming_language",
    "https://en.wikipedia.org/wiki/Object-oriented_programming",
    "https://en.wikipedia.org/wiki/Functional_programming",
    "https://en.wikipedia.org/wiki/Web_development",
    "https://en.wikipedia.org/wiki/Front-end_web_development",
    "https://en.wikipedia.org/wiki/Back-end_web_development",
    "https://en.wikipedia.org/wiki/Full_stack",
    "https://en.wikipedia.org/wiki/Database",
    "https://en.wikipedia.org/wiki/SQL",
    "https://en.wikipedia.org/wiki/NoSQL",
    "https://en.wikipedia.org/wiki/Machine_learning",
    "https://en.wikipedia.org/wiki/Artificial_intelligence",
    "https://en.wikipedia.org/wiki/Deep_learning",
    "https://en.wikipedia.org/wiki/Natural_language_processing",
    "https://en.wikipedia.org/wiki/Computer_vision",
    "https://en.wikipedia.org/wiki/Data_science",
    "https://en.wikipedia.org/wiki/Big_data",
    "https://en.wikipedia.org/wiki/Cloud_computing",
    "https://en.wikipedia.org/wiki/DevOps",
    "https://en.wikipedia.org/wiki/Continuous_integration",
    "https://en.wikipedia.org/wiki/Continuous_deployment",
    "https://en.wikipedia.org/wiki/Version_control",
    "https://en.wikipedia.org/wiki/Git",
    "https://en.wikipedia.org/wiki/Agile_software_development",
    "https://en.wikipedia.org/wiki/Scrum_(software_development)",
    "https://en.wikipedia.org/wiki/Software_testing",
    "https://en.wikipedia.org/wiki/Test-driven_development",
    "https://en.wikipedia.org/wiki/Computer_security",
    "https://en.wikipedia.org/wiki/Network_security",
    "https://en.wikipedia.org/wiki/Cryptography",
    "https://en.wikipedia.org/wiki/Blockchain",
    "https://en.wikipedia.org/wiki/Internet_of_things",
    "https://en.wikipedia.org/wiki/Distributed_computing",
    "https://en.wikipedia.org/wiki/Parallel_computing",
    "https://en.wikipedia.org/wiki/High-performance_computing",
    "https://en.wikipedia.org/wiki/Computer_architecture",
    "https://en.wikipedia.org/wiki/Operating_system",
    "https://en.wikipedia.org/wiki/Linux",
    "https://en.wikipedia.org/wiki/Unix",
    "https://en.wikipedia.org/wiki/Microsoft_Windows",
    "https://en.wikipedia.org/wiki/MacOS",
    "https://en.wikipedia.org/wiki/Mobile_app_development",
    "https://en.wikipedia.org/wiki/Android_(operating_system)",
    "https://en.wikipedia.org/wiki/IOS",
    "https://en.wikipedia.org/wiki/Representational_state_transfer",
    "https://en.wikipedia.org/wiki/GraphQL",
    "https://en.wikipedia.org/wiki/Microservices",
    "https://en.wikipedia.org/wiki/OS-level_virtualization",
    "https://en.wikipedia.org/wiki/Docker_(software)",
    "https://en.wikipedia.org/wiki/Kubernetes",
    "https://en.wikipedia.org/wiki/Serverless_computing",
    "https://en.wikipedia.org/wiki/Quantum_computing",
    
    "https://en.wikipedia.org/wiki/Microsoft",
    "https://en.wikipedia.org/wiki/Apple_Inc.",
    "https://en.wikipedia.org/wiki/Alphabet_Inc.",
    "https://en.wikipedia.org/wiki/Amazon_(company)",
    "https://en.wikipedia.org/wiki/Meta_Platforms",
    "https://en.wikipedia.org/wiki/Oracle_Corporation",
    "https://en.wikipedia.org/wiki/Salesforce",
    "https://en.wikipedia.org/wiki/SAP",
    "https://en.wikipedia.org/wiki/Adobe_Inc.",
    "https://en.wikipedia.org/wiki/IBM",
    "https://en.wikipedia.org/wiki/Intuit",
    "https://en.wikipedia.org/wiki/VMware",
    "https://en.wikipedia.org/wiki/Atlassian",
    "https://en.wikipedia.org/wiki/Workday,_Inc.",
    "https://en.wikipedia.org/wiki/ServiceNow",
    "https://en.wikipedia.org/wiki/Autodesk",
    "https://en.wikipedia.org/wiki/Synopsys",
    "https://en.wikipedia.org/wiki/Palantir_Technologies",
    "https://en.wikipedia.org/wiki/Snowflake_Inc.",
    "https://en.wikipedia.org/wiki/Zoom_Video_Communications",
    "https://en.wikipedia.org/wiki/Twilio",
    "https://en.wikipedia.org/wiki/Dropbox_(service)",
    "https://en.wikipedia.org/wiki/Slack_Technologies",
    "https://en.wikipedia.org/wiki/Shopify",
    "https://en.wikipedia.org/wiki/Square,_Inc.",
    "https://en.wikipedia.org/wiki/Zendesk",
    "https://en.wikipedia.org/wiki/HubSpot",
    "https://en.wikipedia.org/wiki/Okta",
    "https://en.wikipedia.org/wiki/DocuSign",
    "https://en.wikipedia.org/wiki/Splunk",
    "https://en.wikipedia.org/wiki/Unity_Technologies",
    "https://en.wikipedia.org/wiki/Datadog",
    "https://en.wikipedia.org/wiki/Cloudflare",
    "https://en.wikipedia.org/wiki/Nutanix",
    "https://en.wikipedia.org/wiki/Alteryx",
    "https://en.wikipedia.org/wiki/Elastic_NV",
    "https://en.wikipedia.org/wiki/Palo_Alto_Networks",
    "https://en.wikipedia.org/wiki/Fortinet",
    "https://en.wikipedia.org/wiki/CrowdStrike",
    "https://en.wikipedia.org/wiki/Zscaler",
    "https://en.wikipedia.org/wiki/Procore_Technologies",
    "https://en.wikipedia.org/wiki/SentinelOne",
    "https://en.wikipedia.org/wiki/Gainsight",
    "https://en.wikipedia.org/wiki/Visma",
    "https://en.wikipedia.org/wiki/Rippling",
    "https://en.wikipedia.org/wiki/Phreesia",
    "https://en.wikipedia.org/wiki/Unit4",
    "https://en.wikipedia.org/wiki/Majesco_(company)",
    "https://en.wikipedia.org/wiki/Xactly_Corporation",
    "https://en.wikipedia.org/wiki/ABBYY",
    "https://en.wikipedia.org/wiki/Verkada",
    "https://en.wikipedia.org/wiki/Exiger",
    "https://en.wikipedia.org/wiki/Creatio",
    "https://en.wikipedia.org/wiki/WorkWave",
    "https://en.wikipedia.org/wiki/Moveworks",

    "https://en.wikipedia.org/wiki/Job_interview",
    "https://en.wikipedia.org/wiki/Coding_bootcamp",
    "https://en.wikipedia.org/wiki/Competitive_programming",
    "https://en.wikipedia.org/wiki/Whiteboard_coding",
    "https://en.wikipedia.org/wiki/Technical_interview",
    "https://en.wikipedia.org/wiki/Big_O_notation",
    "https://en.wikipedia.org/wiki/Software_design_pattern",
    "https://en.wikipedia.org/wiki/System_design",
    "https://en.wikipedia.org/wiki/Software_engineering_professionalism"
  ]

// Scrape data from wikipedia pages since its relatively updated
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)
const db = client.db(ASTRA_DB_API_ENDPOINT, {namespace: ASTRA_DB_NAMESPACE})

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 100
})

const createCollection = async (similarityMetric: SimilarityMetric = "dot_product") => {
    const res = await db.createCollection(ASTRA_DB_COLLECTION, {
        vector: {
            dimension: 768,
            metric: similarityMetric
        }
    })
    console.log(res)
}

const loadSampleData = async () => {
    const collection = await db.collection(ASTRA_DB_COLLECTION)

    for await (const url of chatbotData) {
        const content = await scrapePage(url)
        const chunks = await splitter.splitText(content)

        for await (const chunk of chunks) {
            const embeddingResult = await model.embedContent(chunk)
            
            const vector = embeddingResult.embedding.values

            const res = await collection.insertOne({
            $vector: vector,
            text: chunk
            })
            console.log(res)
        }
    }
}

const scrapePage = async (url: string) => {
    const loader = new PuppeteerWebBaseLoader(url, {
        launchOptions: {
            headless: true,
        },
        gotoOptions: {
            waitUntil: "domcontentloaded"
        },
         evaluate: async (page, browser) => {
            const result = await page.evaluate(() => document.body.innerHTML)
            await browser.close
            return result
         }
    })
    return (await loader.scrape()) ?.replace(/<[^>]*>?/gm, '')
}

createCollection().then(()=> loadSampleData())