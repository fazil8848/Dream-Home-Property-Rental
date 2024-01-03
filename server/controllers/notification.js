import Notification from "../models/notification.js";
import { getRecipientSocketId, io } from "../socket/socket.js";

export const addNotification = async (req, res) => {
  try {
    console.log(req.body);

    const data = req.body;
    const notification = await Notification.create(data);
    if (notification) {
      const recipientId = getRecipientSocketId(data.reciever);
      io.to(recipientId).emit("newNotification", notification);
      res.status(201).json({ message: "Success", success: true });
    } else {
      return res.json({ error: "Cannot Forward Call" });
    }
  } catch (error) {
    console.log("Error While Adding Notification", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
