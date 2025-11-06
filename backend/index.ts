import express from "express";
import queue from "./queue";
import { startDashboard } from "./dashboard";
import './worker'
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(
    cors({
        origin:'http://localhost:5173'
    })
);

app.get('/', async (req:any,res:any)=>{
    res.send(`PORT is running ${PORT}`);
})

app.post('/sendEmail',async (req:any,res:any)=>{
    try{
        const {to,message} = req.body;
        if(!to || !message){
            return res.status(400).json({message: "Missing message or toEmail"});
        }

        await queue.add('email-queue',{to,message},{attempts:3,backoff:{type:'fixed',delay:5000}})
        console.log("Added to queue 'email-queue'");
        return res.status(200).json({message:"Successfully added to queue"});

    }
    catch(error){
        console.log("Error occured in /sendEmail");
        return res.status(500).json({message:"Internal Server Error"});
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`🚀 Server is running on http://localhost:${PORT}`)
})

startDashboard();

export default app;