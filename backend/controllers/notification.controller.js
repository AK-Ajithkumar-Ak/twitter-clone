import { Notification } from "../models/notification.model.js";

export const getNotifications= async (req, res) => {
    try {
        const currentuserid= req.currentuser._id
        const sendnotification = await Notification.find({to: currentuserid})
        .populate({
            path: "from",
            select: "username profileimg",  // notification to send this particular User model key value
        }).sort({createdAt:-1})  // des order newest first
        await Notification.updateMany({to : currentuserid}, {read: true})
        res.status(200).json(sendnotification)

    } catch (error) {
        onsole.log("Error in getNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}
export const deleteNotifications= async (req, res) => {
    try {
        const currentuserid= req.currentuser._id
        await Notification.deleteMany({to: currentuserid})
        res.status(200).json({message: "Notifications deleted successfully"})
        
    } catch (error) {
        onsole.log("Error in deleteNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}