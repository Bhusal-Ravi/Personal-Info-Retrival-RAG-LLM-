import OpenAI from "openai";
import { vectorStore } from "./prepare.js";
import dotenv from "dotenv";
const groq = new OpenAI({ 
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
 });
dotenv.config();



export async function llmChat(question) {
 
  
 
 
  const result=await vectorStore.similaritySearch(question,5)
  
   const retrivedData=result.map(chunk=>chunk.pageContent).join('/n/n')
   
    

    const systemPrompt=`You are an assistant for question answering questions that are asked about person named Ravi. Use the following relevant pieces of retrieved context to answer the question
                        If you dont know the answer or cannot receive correct information about the query from the retrived context , say that I am only allowed to talk or discuss about the Information related to relevant company only or something like that
                        If the provided context and the question do not match or is not enough, you can say you can ask me questions to know more about ravi
                        Do not say anything about the context not being enough as you answer.
                        If the question is simply hello or nothing related to ravi do not say it seems ravi has intreset in this or ravi is that , just say that Hello there, i can provide you information about ravi `

    const userQuery=`Question:${question}
                     RelevantContext=${retrivedData} 
                     Answer: `;


    
    const completion= await groq.chat.completions.create({
    messages: [
        {
            role:'system',
            content:systemPrompt
        },
      {
        role: "user",
        content: userQuery,
      },
      
    ],
    model: "llama-3.3-70b-versatile",
    

    
  });

  console.log(completion.choices[0].message.content)
  return completion.choices[0].message.content;
}





