const admin = require("../firebase.config");
class SignUpRepository {
    async SignUp({Email,Password,Username}) {
        console.log({Email,Password,Username});

        try {
            const userRecord = await admin.auth().createUser({
                email: Email,
                password: Password,
                emailVerified: false,
                disabled: false,
            });
            const db = admin.firestore();
            await db.collection("users").doc(userRecord.uid).set({
                username: Username || Email.split("@")[0], 
                email: Email,
                followers: [], 
                following: [], 
                posts: [],
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            return { uid: userRecord.uid, email: Email, username: Username };
        } catch (error) {
            throw new Error(`Firebase signup error: ${error.message}`);
        }
    }
   }


module.exports = new SignUpRepository();
