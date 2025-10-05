Person Info Retrieval System (PIRS)

<img width="1920" height="1080" alt="PIRS" src="https://github.com/user-attachments/assets/bfcf9382-ec30-47e8-bfe4-a71c1e45763b" />



## Overview

Person Info Retrieval System (PIRS) is an advanced Retrieval-Augmented Generation (RAG) application designed to answer queries about Ravi Bhusal by referencing his vectorized personal data. This system leverages modern AI and vector database technologies to deliver accurate, context-aware responses.

## What is RAG?

RAG stands for Retrieval-Augmented Generation. It is an AI architecture that combines the strengths of retrieval systems (which fetch relevant documents or data chunks) with generative models (which can produce natural language responses). In a RAG system, the user's query is used to retrieve pertinent information from a knowledge base, and a language model uses both the query and the retrieved content to generate an informed answer.

## System Architecture

The system operates as follows:
1. **Personal Information** about Ravi Bhusal is chunked and encoded using an embedding model.
2. **Vector Database (Pinecone)** stores these embeddings for efficient semantic search.
3. **Retrieval Module** fetches relevant data chunks from the vector database based on user queries.
4. **LLM (Large Language Model)** receives both the user query and retrieved context, generating an accurate answer.

Refer to the diagram above for the overall workflow.

## Technologies Used

- **LangChain**
  - `textsplitter`
  - Embedding model interface
  - Vector database interface

- **Hugging Face**  
  - Embedding Model: `BAAI/bge-base-en-v1.5` (768 dimensions)

- **LLM via Groq SDK**
  - Model: `llama-3.3-70b-versatile`

- **Vector Database**
  - Pinecone

- **Frontend**
  - React

- **Backend**
  - Node.js

## What Can PIRS Do?

- Answers questions about Ravi Bhusal by referencing his personal vectorized data stored in Pinecone.
- Example: Given the question “Where does Ravi currently study?”, PIRS retrieves relevant context and lets the LLM respond accurately (e.g., “Ravi currently studies in Kathmandu Engineering College”).
- Provides precise, context-aware answers by integrating retrieval and generation steps.

## Extending the System

PIRS is modular and can be adapted to other domains or individuals by updating the source data and embeddings. The retrieval and generation pipeline remains the same, ensuring flexibility and scalability.

## How to Run

1. Ensure you have configured Pinecone, Hugging Face access, and a Groq API key.
2. Start the backend (Node.js) server.
3. Launch the frontend (React) app.
4. Interact with the system through the web interface to query Ravi Bhusal’s information.

## Customization

- You can add more personal data for Ravi Bhusal to enhance answers.
- The embedding model and LLM are configurable for different use cases or languages.

---

This repository delivers a modern RAG solution for personal information retrieval, demonstrating how advanced AI and vector search can provide fact-based answers about individuals.
