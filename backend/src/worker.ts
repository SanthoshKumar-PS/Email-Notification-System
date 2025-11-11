import {Worker,Job} from 'bullmq';
import connection from './connection';
import sendEmail from './sendEmail';
interface MailProps {
    to:string;
    message:string
}
export const worker = new Worker<MailProps>('email-queue', async (job:Job<MailProps>) => {
    console.log("Worker Job: ",job.data)
    console.log("Worker Job id: ",job.data)
    try {
        await sendEmail(job.data.to,job.data.message);
        console.log("Email sent successfully")
    } catch (error) {
        console.log("Error occured while sending mail")
        throw error;
    }
},{connection});

worker.on('completed',(job)=>{
    console.log(`✅ Job ${job.id} done`)
})

worker.on('failed', (job,err)=>{
    console.error(`❌ Job ${job?.id} failed: ${err.message}`)
})