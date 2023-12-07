import React from 'react'
import { Input} from '@material-tailwind/react'
import { IoMdSend } from "react-icons/io";

const MessageInput = () => {
  return (
    <>
      <form action="">
        <div className='p-2 flex '>
        <Input label="Input With Icon" icon={<IoMdSend/>} className='w-full py-1' />
        </div>
      </form>
    </>
  )
}

export default MessageInput
