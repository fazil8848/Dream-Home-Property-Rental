import React from "react";
import { useSocket } from "../../../Context/SocketContext";
import { Link } from "react-router-dom";
import { generateError, generateSuccess } from "../../Dependencies/toast";
import { useMarkNotificationAsReadMutation } from "../../../Redux/Slices/userApi/usersApiSlice";
import { useSelector } from "react-redux";

const NotificationListingOwner = () => {
  const { ownerNotification, setOwnerNotification } = useSocket();
  const [markAsReadCall] = useMarkNotificationAsReadMutation();
  const { ownerInfo } = useSelector((state) => state.owner);
  const userId = ownerInfo._id;

  const handleMarkRead = async (id) => {
    try {
      const result = await markAsReadCall({ id, userId }).unwrap();
      if (result.error) {
        generateError(result.error);
      } else {
        console.log(result);
        generateSuccess(result.message);
        setOwnerNotification(result.notifications);
      }
    } catch (error) {
      console.error(error);
      generateError(error.message);
    }
  };
  return (
    <>
      <div className="w-screen flex justify-center py-10 min-h-screen">
        <div className="w-full flex flex-col gap-2 lg:w-1/3 md:w-1/2 bg-white border rounded-md shadow-lg h-fit p-10">
          <div className="mb-5">
            <h3 className="text-xl">Notifications</h3>
          </div>
          {ownerNotification.length > 0 ? (
            ownerNotification.map((noti, i) => (
              <div
                className={
                  noti.read
                    ? `h-16 p-2 w-full border rounded-md shadow-lg flex justify-between items-center gap-4`
                    : `h-16 p-2 w-full bg-blue-gray-100 border rounded-md shadow-lg flex justify-between items-center gap-4`
                }
                key={i}
              >
                <div className=" h-full rounded-full">
                  <img
                    src={noti.sender?.profilePic}
                    alt="img"
                    className="rounded-full w-[3.5rem] h-full"
                  />
                </div>
                <div className="w-2/3 ">
                  <p>{noti.message}</p>
                </div>
                <div
                  className="w-1/3 "
                  onClick={() => handleMarkRead(noti._id)}
                >
                  {noti.read ? "Read" : "Mark Read"}
                </div>
                {noti.link && (
                  <div className=" ">
                    <Link to={noti.link}>Join</Link>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No Notifications Available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationListingOwner;
