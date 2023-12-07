import React from "react";
import { Typography } from "@material-tailwind/react";
import { Avatar, Divider, Skeleton } from "@mui/material";
import { GoVerified } from "react-icons/go";
import Message from "../Message/Message";
import MessageInput from "../MessageInput/MessageInput";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const selectedChat = useSelector((state)=> state.chat.selectedUserConversation)

  return (
    <>
      <span className="w-[300px] sm:w-full border mx-auto bg-blue-gray-50 rounded-md">
        <div className="px-4 flex items-center h-16 gap-2">
          <Avatar src="" sizes="sm" />
          <Typography className="flex items-center">
            John Doe <GoVerified className="w-4 h-4 ml-1" />
          </Typography>
        </div>
        <Divider />

        <div className="flex flex-col p-4 gap-4 my-4 h-[400px] overflow-y-auto">
          {true && [0,1,2,3,4,5].map((_, i) => (
            <div
              key={i}
              className={`flex gap-2 items-center p-1 rounded-md ${
                i % 2 === 0 ? "self-start" : "self-end"
              }`}
            >
              {i % 2 === 0 && (
                <Skeleton
                  animation="pulse"
                  variant="circular"
                  width={50}
                  height={50}
                />
              )}
              <div className="flex flex-col gap-2">
                <Skeleton height={"8px"} width={"250px"} />
                <Skeleton height={"8px"} width={"250px"} />
                <Skeleton height={"8px"} width={"250px"} />
              </div>
              {i % 2 !== 0 && (
                <Skeleton
                  animation="pulse"
                  variant="circular"
                  width={50}
                  height={50}
                />
              )}
            </div>
          ))}
          <Message ownMessage={true}/>
          <Message ownMessage={false}/>
          <Message ownMessage={true}/>
          <Message ownMessage={false}/>
          <Message ownMessage={true}/>
          <Message ownMessage={false}/>
          <Message ownMessage={true}/>
          <Message ownMessage={false}/>
        </div>
        <MessageInput/>
      </span>
    </>
  );
};

export default MessageContainer;
