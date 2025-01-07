# DevHorizon Nova – Empowering Tech Careers with RAG-Powered Insights

DevHorizon Nova is an advanced Retrieval-Augmented Generation (RAG) chatbot designed to help aspiring tech professionals navigate the world of technology, companies, and required skills for their careers.

## Deployed Website

Access the live version of DevHorizon Nova here, make sure to let it load for ~50 seconds: [https://devhorizonnova.onrender.com/](https://devhorizonnova.onrender.com/)

### Notes:

- **Render Hosting**: Render automatically shuts down the server during periods of inactivity. If the website appears inactive, it might take about a minute to start up again especially since app is internally running in a docker container looking for an open port.

- **GoogleGenerativeAI Integration**: The chatbot uses advanced Google's `embedding-001` model for vector embeddings and `gemini-1.5-pro` for real-time responses, so please expect occasional delays during peak usage.

## Project Overview

### Application Features

- **Explore Tech Stacks**: Get detailed information about various tech stacks used by companies.

- **Company Insights**: Learn about companies, their technologies, and the technical skills required for roles within those companies.

- **Actionable Career Guidance**: Receive AI-driven insights and tips to help you achieve your career goals.

### Core Technologies

DevHorizon Nova is built using the following technologies:

- **LangChain**: Seamlessly integrates language models and external data sources to enhance responses.
- **DataStax AstraDB**: Vector embedding search and database.
- **GoogleGemini**: A generative AI model that powers advanced conversational  and embedding capabilities.
- **Next.js**: Utilizes server-side rendering for fast performance and efficient routing.
- **Tailwind CSS**: Provides a responsive, utility-first CSS framework for rapid UI development.

## How it works
The RAG-powered chatbot pulls context from various sources to provide relevant and accurate answers. It combines the power of large language models with external data retrieval systems to improve response quality. 

`./scripts/loadDB.ts` is a script that when run, web scrapes data from numerous web pages, and stores the vector embeddings inside an AstraDB database.

The latest time this script was run and the DB was updated is: *December 2024*

## Run Locally
This will only work if you have setup a `.env` at project root similar to `.env.template`
1. Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. Clone the repo

```bash
git clone https://github.com/JalalA984/rag-chatbot.git
```

3. Pull the Docker image by running the following command:

```bash
docker pull jalal984/rag-chatbot
```
4. Run command 
```bash
docker-compose up
```