import React, { useEffect, useState } from "react";
import { Avatar, Badge, Box, Stack, Typography, styled } from "@mui/material";
import { GoVerified } from "react-icons/go";
import { BsCheck2All } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUserConversation } from "../../../Redux/Slices/chatSlices/userChatSlice";

const Conversations = ({ conversation, userId, isOnline }) => {
  const owner = conversation.participants[0];
  const { lastMessage } = conversation;
  const [selectedConversation, setSelectedConversation] = useState({});

  const dispatch = useDispatch();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const handleClick = () => {
    const selectedChat = {
      _id: conversation._id,
      ownerId: owner._id,
      ownerName: owner.fullName,
    };
    dispatch(setSelectedUserConversation(selectedChat));
    // Use selectedConversation directly, no need for useSelector here
    setSelectedConversation(selectedChat);
  };

  return (
    <div
      className={`flex items-center px-2 py-1 gap-2 hover:cursor-pointer ${
        selectedConversation._id === conversation._id ? " bg-gray-200" : ""
      } my-0.5 rounded-md`}
      onClick={handleClick}
    >
      <Stack>
        {isOnline ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              alt="Remy Sharp"
              src="https://res.cloudinary.com/dn6anfym7/image/upload/v1700566625/dreamHome/arqhv0bipniec9xpfu7m.jpg"
            />
          </StyledBadge>
        ) : (
          <Avatar
            alt="Remy Sharp"
            src="https://res.cloudinary.com/dn6anfym7/image/upload/v1700566625/dreamHome/arqhv0bipniec9xpfu7m.jpg"
          />
        )}
      </Stack>
      <Stack direction={"column"} fontSize={"sm"}>
        <Typography
          color={"black"}
          fontWeight={"700"}
          display={"flex"}
          alignItems={"center"}
        >
          {owner.fullName} <GoVerified className="w-4 h-4 ml-1" />
        </Typography>
        <Typography
          color={"black"}
          className="text-xs"
          display={"flex"}
          alignItems={"center"}
          gap={1}
        >
          {userId === lastMessage.sender ? <BsCheck2All size={16} /> : ""}
          {lastMessage.text.length > 18
            ? lastMessage.text.substring(0, 18) + "..."
            : lastMessage.text}
        </Typography>
      </Stack>
    </div>
  );
};

export default Conversations;
