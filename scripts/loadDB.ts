// Load all data into AstraDB and do our web scraping

import { DataAPIClient } from "@datastax/astra-db-ts"
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer"

// for vector embeddings instead of openai use gemini
import { GoogleGenerativeAI } from "@google/generative-ai"


