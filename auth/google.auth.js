const admin = require("../firebase.config");

class GoogleAuth {
    async verifyGoogleAuth({ token_id }) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(token_id);
            const db = admin.firestore();
            const userRef = db.collection("users").doc(decodedToken.uid);
            const userSnapshot = await userRef.get();

            if (!userSnapshot.exists) {
                await userRef.set({
                    username: decodedToken.name || decodedToken.email.split("@")[0],
                    email: decodedToken.email,
                    phoneNumber: decodedToken.phone_number || null,
                    followers: [], 
                    following: [], 
                    posts: [],
                    verified: true,
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                });
            }

            return { success: true, uid: decodedToken.uid, email: decodedToken.email };
        } catch (error) {
            throw new Error(`Firebase Google Auth error: ${error.message}`);
        }
    }

}

module.exports = new GoogleAuth();
