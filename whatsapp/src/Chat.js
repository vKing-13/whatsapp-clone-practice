import React, { useState } from "react"
import "./Chat.css"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { AttachFile, MoreVert, InsertEmoticon, Mic } from "@mui/icons-material"
import { Avatar, IconButton } from "@mui/material"
import axios from "./axios"
function Chat({ messages }) {
   const [input, setInput] = useState("")
   const sendMessage = async (e) => {
      e.preventDefault()
      await axios.post("/messages/new", {
         message: input,
         name: "demo app",
         timestamp: "Just Now!",
         received: false,
      })
      setInput("")
   }
   return (
      <div className="chat">
         <div className="chat__header">
            <Avatar />

            <div className="chat__headerInfo">
               <h3>Room name</h3>
               <p>Last seen at...</p>
            </div>

            <div className="chat__headerRight">
               <IconButton>
                  <SearchOutlinedIcon></SearchOutlinedIcon>
               </IconButton>
               <IconButton>
                  <AttachFile></AttachFile>
               </IconButton>
               <IconButton>
                  <MoreVert></MoreVert>
               </IconButton>
            </div>
         </div>

         <div className="chat__body">
            {messages.map((message) => (
               <p
                  className={`chat__message ${
                     message.received && "chat__receiver"
                  }`}
               >
                  <span className="chat__name">{message.name}</span>
                  {message.message}
                  <span className="chat__timestamp">{message.timestamp}</span>
               </p>
            ))}
         </div>

         <div className="chat__footer">
            <InsertEmoticon />
            <form>
               <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message"
                  type="text"
               />
               <button onClick={sendMessage} type="submit">
                  Send a message
               </button>
            </form>
            <Mic />
         </div>
      </div>
   )
}

export default Chat
