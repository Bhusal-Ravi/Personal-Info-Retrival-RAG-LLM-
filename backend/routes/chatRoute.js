import express from 'express';
import { llmChat } from '../chat.js';
const router= express.Router();

router.post(`/chat`,async(req,res)=>{
    try{
        const {message}=req.body
        const response=await llmChat(message)
       
       

        res.status(200).json({error:false,message:response})
    }catch(error){
        console.log(error)
    }
})

export default router

