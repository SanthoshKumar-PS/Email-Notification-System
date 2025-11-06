import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendEmail(to:string,message:string){
  const html = `
    <h2>👋 Greetings from Santhosh!</h2>
    <p>Hi <strong>${to}</strong>,</p>
    <p>I'm glad to hear from you. Here’s the message you typed:</p>
    <blockquote style="border-left: 4px solid #4a90e2; padding-left: 10px; color: #555;">
      ${message}
    </blockquote>
    <p>Hope you have a great day! 🌟</p>
  `;
    const mailOptions = {
        from:process.env.EMAIL_USER,
        to,
        subject:"Your presence made my day🎁",
        html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
}

export default sendEmail