import React, { useState , useRef, useEffect} from 'react'
import logo from "./assets/Logo1.png"
import { RiTelegram2Line } from "react-icons/ri";
import { VscRobot } from "react-icons/vsc";
import axios from 'axios';
import { FaRegUser } from "react-icons/fa";

function App() {

const apiurl = import.meta.env.VITE_CHAT_BOT_API
  const scrollRef = useRef()
  const [prompt , setPrompt] = useState("")
  // const [result , setResult ] = useState("")
  const [message , setMessage]=useState([])
  const [loading , setLoading] =useState(false)

useEffect(()=>{
  scrollRef.current?.scrollIntoView({behavior :"smooth"});
},[message])


  const handleSubmit = async()=>{

    const userMessage ={sender:'user' , text: prompt}
    setMessage(prev => [...prev, userMessage])
    const currentInput = prompt
    setPrompt("")
    if (!prompt.trim()) return;
    try {
      setLoading(true)
      const response = await axios.post(apiurl,{//api/chat/stream
        question:currentInput
      })
      const botMessage = {sender:"bot",text:response.data}
      setMessage(prev => [...prev, botMessage])
      // setResult(response.data)
      console.log(response.data)

    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='bg-linear-to-t from-[#011023] via-[#052558] to-[#011023]  flex flex-col items-center h-screen'>
      <nav className='flex justify-center w-screen backdrop-blur-2xl h-15'><img className='transition-transform duration-500 w-15 hover:rotate-[360deg]' src={logo} alt="" /> <div>
        <h2 className='text-[#527FB0] text-2xl'>
          MLCoE AI Assistant
        </h2>
        <p className='text-[#527FB0]/50'>
          Powered by Advanced Intelligence
        </p>
      </div> </nav>
      <div className='md:min-h-120 min-h-130 md:w-200 backdrop-blur-3xl rounded-3xl my-2 flex flex-1 h-130 [scrollbar-width:none] flex-col justify-center items-center overflow-y-auto'>

          <img src={logo} className='h-20' alt="" />
          <h2 className='text-[#527FB0] text-2xl my-1 md:my-5 mx-5 ' >Welcome to MLCoE AI Assistant</h2>
          <p className='text-[#527FB0]/50 mx-3 md:mx-20'>Your intelligent companion for Machine Learning Centre Of Excellence.</p>
          {message.length===0 && (
            <div className='flex mx-4 md:mx-20 mt-6 '>
            <span className='text-3xl my-auto p-1 rounded-md mr-2 text-[#011023] bg-white/75'><VscRobot/></span>
            <p className='bg-white/75 text-[#011023] rounded-2xl pl-5 mr-13 pr-2 py-2'>Hello! I'm the MLCoE AI Assistant. How can I assist you today?</p>
          </div>
          )}

          {message.map((msg , i)=>(
            msg.sender === "user"?
            <div key={i} className='flex mt-6  w-full justify-end px-3 md:px-20'>
            <p className='bg-white/75 text-[#011023] rounded-2xl pl-5 pr-4 py-2 ml-13'>{msg.text}</p>
            <span className='text-3xl rounded-md  my-auto p-0.5 ml-2 text-[#011023] bg-white/75'><FaRegUser/></span>
          </div>
          :<div key={i} className='flex w-full justify-start px-3 md:px-20 mb-3 mt-6 '>
            <span className='text-3xl my-auto p-1 rounded-md mr-2 text-[#011023] bg-white/75'><VscRobot/></span>
            <p className='bg-white/75 text-[#011023] rounded-2xl pl-5 mr-13 pr-2 py-2'>{`${msg.text}`}</p>
          </div>
          ))}
          {loading && (
      <div className='flex w-full justify-start px-3 md:px-20 mt-6 mb-3 animate-pulse'>
        <span className='text-3xl my-auto p-1 rounded-md mr-2 text-[#011023] bg-white/75'><VscRobot/></span>
        <p className='bg-white/75 text-[#011023] rounded-2xl pl-5 pr-10 py-2'>AI is thinking...</p>
      </div>
    )}
          

          <div ref={scrollRef} />
      </div>

      <div className='backdrop-blur-3xl pl-3 mx-5 w-screen md:w-200 flex justify-center h-18 text-xl text-white rounded-2xl'>
        <input value={prompt} onKeyDown={(e)=>{
          if(e.key==="Enter"){
            handleSubmit()
          }
        }} onChange={(e)=>(setPrompt(e.target.value))} type="text" placeholder='Ask me anything...' className=' w-180 focus:outline-none' />
        <button onClick={handleSubmit} className='text-3xl'><RiTelegram2Line/></button>
      </div>
    </div>
  )
}

export default App