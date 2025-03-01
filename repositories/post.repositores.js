const admin = require("../firebase.config");
const { v4: uuidv4 } = require('uuid');
class PostRepository {
    async createPost({type,text,URL,userID}){
        try {
            console.log({type,text,URL,userID});
            if (!type || !text) {
              return res.status(400).json({ error: "Type and text are required" });
            }
            if (!["text", "video", "photo"].includes(type)) {
              return res.status(400).json({ error: "Invalid post type" });
            }
            if ((type === "video" || type === "photo") && !URL) {
              return res.status(400).json({ error: "Media URL required for video/photo" });
            }
            const postId = uuidv4();
            const postData = {
              postId,
              userId: userID, 
              type,
              text,
              createdAt: admin.firestore.FieldValue.serverTimestamp(),
              updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            };
            if (type === "video" || type === "photo") {
              postData.mediaUrl = URL;
            }
            const db = admin.firestore();
            await db.collection("posts").doc(postId).set(postData);
            const userRef = db.collection("users").doc(userID);
                await userRef.update({
                posts: admin.firestore.FieldValue.arrayUnion(postId) 
            });
        return { success: true, message: "Post created", postId };
          } catch (error) {
            throw new Error(`Firebase signup error: ${error.message}`);
          }
    }
}
module.exports = new PostRepository();