import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
//import { VoyageEmbeddings } from "@langchain/community/embeddings/voyage";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import dotenv from 'dotenv';

dotenv.config()


// //Voyage ai used - provides 200 million tokens per model for free
//             const embeddings = new VoyageEmbeddings({
//             apiKey: process.env.VOYAGE_API_KEY, 
            
            
            
//             });


          const embeddings = new HuggingFaceInferenceEmbeddings({
              apiKey: process.env.HUGGINGFACEHUB_API_KEY, 
            model:"BAAI/bge-base-en-v1.5", 
              provider: "auto", 
              
            });


            const pinecone = new PineconeClient(); //using pinecone as a Vector DataBase
            const pineconeIndex= pinecone.Index(process.env.PINECONE_INDEX_NAME)
           export  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
                          pineconeIndex,
                          
                          maxConcurrency: 5,

                          });

export async function indexTheDocument(filePath){

   // try{
    const loader= new PDFLoader(filePath, {splitPages:false})
    const doc= await loader.load() //pdf text


    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1500,
        chunkOverlap: 300,
        });

    const texts = await textSplitter.splitText(doc[0].pageContent); //create chunks
 
   const documents= texts.map((chunk)=>{
        return {
        pageContent: chunk,
        metadata: doc[0].metadata
        }

})

console.log(documents)
    
     const pineconeStore=await vectorStore.addDocuments(documents);
     console.log(pineconeStore)

    //}catch(error){
      //  console.log(error)
    //}
    
   
  
}

