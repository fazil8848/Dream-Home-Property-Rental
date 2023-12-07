import { Avatar } from "@material-tailwind/react";
import { Typography } from "@mui/material";
import React from "react";

const Message = ({ ownMessage, message }) => {
  return (
    <div>
      {ownMessage ? (
        <div className="flex gap-2 float-right self-end ">
          <Typography
            maxWidth={"340px"}
            className="bg-blue-400 p-2 rounded-md rounded-br-none shadow-lg"
          >
            {message.text}
          </Typography>
          <Avatar
            src="https://res.cloudinary.com/dn6anfym7/image/upload/v1700566625/dreamHome/arqhv0bipniec9xpfu7m.jpg"
            width={"7"}
            height={"7"}
          />
        </div>
      ) : (
        <div className="flex gap-2">
          <Avatar
            src="https://res.cloudinary.com/dn6anfym7/image/upload/v1700566625/dreamHome/arqhv0bipniec9xpfu7m.jpg"
            width={"7"}
            height={"7"}
          />
          <Typography
            maxWidth={"340px"}
            className="bg-white p-2 rounded-md rounded-bl-none shadow-lg"
          >
            {message.text}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Message;
