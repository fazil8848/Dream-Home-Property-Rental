import React, { useEffect, useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { Skeleton } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import { GiConversation } from "react-icons/gi";
import Conversations from "../Conversations/Conversations";
import MessageContainer from "../MessageContainer/MessageContainer";
import { generateError } from "../../Dependencies/toast";
import { useGetConversationsMutation } from "../../../Redux/Slices/userApi/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalOwnerConversations } from "../../../Redux/Slices/chatSlices/userChatSlice";

const Chat = () => {
  const { userInfo } = useSelector((state) => state.user);
  const userId = userInfo._id;
  const [conversations, setConversations] = useState([]);
  const [conversationLoading, setConversationsLoading] = useState(false);
  const selectedChat = useSelector(
    (state) => state.chat.selectedUserConversation
  );
  const dispatch = useDispatch();
  const allConversations = useSelector((state) => state.chat.ownerConversations);
  const [getConversationsCall] = useGetConversationsMutation();

  const fetchConversations = async () => {
    try {
      setConversationsLoading(true);
      const result = await getConversationsCall(userId).unwrap();
      if (result.error) {
        generateError(result.error);
      } else {
        dispatch(setGlobalOwnerConversations(result.conversations));
      }
    } catch (error) {
      generateError(error.message);
    } finally {
      setConversationsLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [userId]);

  useEffect(() => {
    // Update local state when global state changes
    setConversations(allConversations);
  }, [allConversations]);

  return (
    <>
      <div className="flex justify-center">
        <div className="py-4  w-full md:w-[90%] lg:w-[850px] p1 md:p-4 border shadow-xl mt-4 rounded-md">
          <div className="flex flex-col md:flex-row gap-4 max-w-full mx-auto">
            <span className="lg:w-[300px] p-3 gap-2 flex-col mx-auto">
              <Typography className="">Your Conversations</Typography>
              <form>
                <Typography className="flex items-center gap-2">
                  <Input type="text" placeholder="search for the user" />
                  <Button className="border bg-black hover:bg-white hover:text-black">
                    <BiSearch size={16} />
                  </Button>
                </Typography>
              </form>

              <div className="overflow-y-auto sm:h-[200px] md:h-[465px] card">
                {conversationLoading &&
                  [0, 1, 2, 3, 4].map((_, i) => (
                    <div
                      key={i}
                      className="flex gap-4 items-center rounded-md p-1"
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

                <div className="my-2">
                  {!conversationLoading &&
                    conversations.map((conversation, i) => (
                      <Conversations
                        conversation={conversation}
                        userId={userId}
                        key={i}
                      />
                    ))}
                </div>
              </div>
            </span>
            {!selectedChat ? (
              <span className="w-[300px] sm:w-full border mx-auto bg-blue-gray-50 rounded-md flex flex-col items-center justify-center">
                <GiConversation size={100} />
                <Typography className="text-lg">
                  {" "}
                  Select conversation to start texting
                </Typography>
              </span>
            ) : (
              <MessageContainer />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
