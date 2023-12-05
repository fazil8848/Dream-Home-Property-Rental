import React from 'react'
import { useParams } from 'react-router-dom'

const ChatBox = () => {
    const {ownerId} = useParams();
  return (
    <>
      {ownerId}
    </>
  )
}

export default ChatBox
