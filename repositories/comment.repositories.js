const admin = require("../firebase.config");
const { v4: uuidv4 } = require('uuid');

class CommentRepository {
    async Comment({ postID, userID, text }) {
        console.log({ postID, userID, text });
        console.log("this is respo");
        try {
            const commentID = uuidv4();
            const commentData = {
                commentID,
                postID,
                userID,
                text,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            };
            const db = admin.firestore();
            await db.collection("comments").doc(commentID).set(commentData);
            const postRef = db.collection("posts").doc(postID);
            const postDoc = await postRef.get();
            if (!postDoc.exists) {
                throw new Error("Post not found");
            }
            await postRef.update({
                Comments: admin.firestore.FieldValue.arrayUnion(commentID)
            });

            return { success: true, message: "comment added", commentID };
        } catch (error) {
            console.error("Error adding comment:", error);
            return { success: false, message: "Failed to add comment", error: error.message };
        }
    }

    async reply({ commentID, userID, text }) {
        console.log({ commentID, userID, text });
        console.log("this is respo");
        try {
            const ReplyID = uuidv4();
            const ReplyData = { 
                commentID,
                replyID:ReplyID,
                userID,
                text,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            };
            const db = admin.firestore();
            await db.collection("replies").doc(ReplyID).set(ReplyData);
            const commentRef = db.collection("comments").doc(commentID);
            const commentDoc = await commentRef.get();
            if (!commentDoc.exists) {
                throw new Error("Comment not found");
            }
            await commentRef.update({
                replies: admin.firestore.FieldValue.arrayUnion(ReplyID)
            });

            return { success: true, message: "reply added", ReplyID };
        } catch (error) {
            console.error("Error adding comment:", error);
            return { success: false, message: "Failed to add comment", error: error.message };
        }
    }
}

module.exports = new CommentRepository; 