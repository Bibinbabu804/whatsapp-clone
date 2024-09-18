import React, { useContext, useEffect, useState } from 'react'
import "./Chat.css"
import LeftSidebar from '../../components/LeftSideBar/LeftSidebar'

import RightSidebar from '../../components/RightSidebar/RightSidebar'
import ChatBox from '../../components/ChatBox/ChatBox'
import { AppContext } from '../../context/AppContext'

const Chat = () => {
  const {chatData,userData} =useContext(AppContext)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    if (chatData && userData) {

      setLoading(false)
      
    }



  },[chatData,userData])
  return (
    <div className='chat' >

      {

        loading
        ? <p className='loading'>Syncing...</p>
        :
        <div className="chat-container">
        <LeftSidebar/>
       <ChatBox/>
        <RightSidebar/>

      </div>


      }
      
     
    </div>
  )
}

export default Chat