import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';


export default function ChatbotUI() {

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [userInput, setUserInput] = useState("")

  async function handleChat(userMessage) {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:4001/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage.trim() })
      })
      if (!response.ok) {
        setLoading(false)
        throw new Error("Could not get the information")
      }

      const result = await response.json();
      console.log(result)
      setMessages((prev) => [...prev, { message: result.message, sender: "llm" }])
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

  }, [messages])

  function handleAppend(e, invoke) {
    if (loading) return
    if (e.key === 'Enter' && !e.shiftkey && invoke === 'key') {
      e.preventDefault()
      if (userInput) {
        setMessages((prev) => [...prev, { message: userInput, sender: "user" }])
        handleChat(userInput)
      }

      setUserInput("")
      console.log(messages)
    }
    if (invoke === 'button') {

      if (userInput) {
        setMessages((prev) => [...prev, { message: userInput, sender: "user" }])
        handleChat(userInput)
      }
      setUserInput("")
      console.log(messages)
    }
  }
  return (

    <div className="min-h-screen w-full relative">
      {/* Crimson Depth */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b0707 100%)",
        }}
      />
      < div className="relative z-10 flex flex-col h-screen" >


        {/* Navbar */}
        <nav className="fixed w-full  text-white shadow-lg border-b border-gray-700/40 px-6 py-4 flex items-center justify-between" style={{
          background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b0707 100%)",
        }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md">
              <span className="font-bold text-lg">AI</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold tracking-wide">
                Ravi AI
              </h1>
              <p className="text-xs text-gray-300 -mt-1 italic">
                Know about Ravi . . .
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-sm text-gray-300">Online</p>
          </div>
        </nav>

        {/* Chat Display Area */}
        < div className="container px-2 text-white  border-black/10  pb-[150px] pt-[100px] mx-auto max-w-3xl" >

          {messages.map((item, index) => (
            <div className={`${item.sender === 'user' ? "ml-auto bg-red-600/20 py-1 px-3 rounded-md" : "mr-auto font-mono"} max-w-fit mb-[20px] whitespace-pre-wrap  `}>
              {item.message}
            </div>
          ))}

          {loading && (<h1 className='font-mono animate-pulse bg-gradient-to-r from-red-200 via-rose-400 to-red-900 bg-clip-text text-transparent'>Loading your answer . . .</h1>)}

        </div >

        {/* Input Area */}
        < div className=" p-4 border-t fixed inset-x-0 bottom-0 border-white/50" >
          <div className="max-w-4xl mx-auto flex gap-3">
            <textarea

              onKeyUp={(e) => handleAppend(e, "key")}
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
              placeholder="Know about ravi . . ."
              className="flex-1 text-white bg-gray-200/10 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-gray-400 border border-white/50"
              rows="2"
            />
            <button disabled={loading} onClick={(e) => handleAppend(e, "button")} className="bg-gray-700 text-white px-6 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center border border-white/50">
              <Send size={20} />
            </button>
          </div>
        </div >
      </div >
    </div>



  );
}