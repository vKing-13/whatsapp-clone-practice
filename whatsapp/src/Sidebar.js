import React from "react"
import "./Sidebar.css"
import SidebarChat from "./SidebarChat"
import { Avatar, IconButton } from "@mui/material"
import { MoreVert, DonutLarge, Chat } from "@mui/icons-material"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import av from "./static/images/rose.jpg"
function Sidebar() {
   return (
      <div className="sidebar">
         <div className="sidebar__header">
            <Avatar alt="R" src={av} />
            <div className="sidebar__headerRight">
               <IconButton>
                  <DonutLarge></DonutLarge>
               </IconButton>
               <IconButton>
                  <Chat></Chat>
               </IconButton>
               <IconButton>
                  <MoreVert></MoreVert>
               </IconButton>
            </div>
         </div>
         <div className="sidebar__search">
            <div className="sidebar__searchContainer">
               <SearchOutlinedIcon></SearchOutlinedIcon>
               <input
                  placeholder="Search or start new chat"
                  type="text"
               ></input>
            </div>
         </div>
         <div className="sidebar__chats">
            <SidebarChat />
            <SidebarChat />
            <SidebarChat />
         </div>
         
      </div>
   )
}

export default Sidebar
