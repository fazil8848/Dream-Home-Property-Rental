import { Button, Input, Typography } from "@material-tailwind/react";
import { Skeleton, Stack } from "@mui/material";
import React from "react";
import { BiSearch } from "react-icons/bi";
import Conversations from "../Conversations/Conversations";
import { GiConversation } from "react-icons/gi";

const Chat = () => {
  return (
    <>
      <div class="absolute py-10 left-1/2 w-full md:w-[80%] lg:w-[750px] p-4 transform -translate-x-1/2">
        <div class="flex flex-col md:flex-row gap-4 max-w-full md:max-w-md mx-auto">
          <span class="flex-1 md:flex-3 gap-2 flex-col mx-auto">
            <Typography className="">Your Conversations</Typography>
            <form>
              <Typography className="flex items-center gap-2">
                <Input type="text" placeholder="search for the user" />
                <Button
                  color="inherit"
                  className="border bg-black hover:bg-white hover:text-black"
                >
                  <BiSearch size={16} />
                </Button>
              </Typography>
            </form>

            {true &&
              [0, 1, 2, 3, 4].map((_, i) => (
                <div
                  key={i}
                  className=" flex gap-4 items-center rounded-md p-1"
                >
                  <div>
                    <Skeleton
                      animation="pulse"
                      variant="circular"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="w-full">
                    <Skeleton animation="pulse" width={90} height={20} />
                    <Skeleton animation="pulse" width={"90%"} height={16} />
                  </div>
                </div>
              ))}

            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
          </span>
          <Stack flex={70} p={2} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} height={'400px'} className="rounded-md">
                <GiConversation size={100} />
          </Stack>
          <span class="flex-7">MessageContainer</span>
        </div>
      </div>
    </>
  );
};

export default Chat;
