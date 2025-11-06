import axios from "axios";
import { Mail, MessageSquare, SquareCheckBig, TriangleAlert } from "lucide-react"
import { useState } from "react"

function App() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [email,setEmail] = useState<string>("");
  const [message,setMessage] = useState<string>("");
  const [success,setSuccess] = useState<string|null>(null);
  const [error,setError] = useState<string|null>(null);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    try{
      if(!email || !message){
        throw new Error("Email and message are required")
        return
      }
      const response = await axios.post(`${BACKEND_URL}/sendEmail`,{
        to:email,
        message:message
      })
      if(response.status===200){
        setSuccess(`Mesage sent to ${email}`);
        setEmail("")
        setMessage("")
        console.log("Mesage sent successfully")
      }
    }
    catch(error:any){
      console.log("Error occured while calling the backend")
      setError(error.message ||"Couldn't send messages.")
    }


  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1729] to-[#111A2C] flex justify-center items-center p-6">
      <div className="bg-[#1D283A] rounded-lg p-6 md:p-10 space-y-4 ">
        {/* Headers */}
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="bg-blue-300/20 p-3 rounded-xl">
              <Mail className="w-5 h-5 text-blue-500 "/>
            </div>
            <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">Send Notification</h2>
          </div>
          <p className="text-zinc-300/50 font-medium">Send an email notification to your recipient with a custom message.</p>
        </div>
        
        {/* Form Component */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-white font-medium">Recipient Email</label>
            <div className="mt-2 relative">
              <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"/>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} required type="email" placeholder="recipient@example.com" name="" id="" className="w-full bg-blue-200/20 pl-11 pr-5 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="text-white font-medium">Message</label>
            <div className="mt-2 relative">
              <MessageSquare  size={20} className="absolute left-4 top-4 text-white/60"/>
              <textarea value={message} onChange={(e)=>setMessage(e.target.value)} required placeholder="Type your message here..." name="" id="" className="w-full bg-blue-200/20 pl-11 pr-5 py-3 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
          </div>

          {success && (
            <div className="text-green-500/80 font-medium flex items-center gap-2">
              <SquareCheckBig size={20}/>
                {success}
              </div>
          )}
          
          {error && (
            <div className="text-red-500/80 font-medium flex items-center gap-2">
              <TriangleAlert size={20}/>
                {error}
              </div>
          )}

          <button type="submit" className="bg-blue-500/90 rounded-xl py-3 flex w-full gap-2 items-center justify-center text-white font-medium hover:bg-blue-500/50 transition-all duration-300 active:scale-95">
            <Mail className="h-5 w-5 "/>
            <p>Send Notification</p>
          </button>
        </form>


      </div>
    </div>
  )
}

export default App
