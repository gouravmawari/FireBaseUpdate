const admin = require("../firebase.config");
const Verifyemail = require("../constant/emailverify");
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
                verified:false,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });
            // Verifyemail(Email,userRecord.uid,Username);
            return { uid: userRecord.uid, email: Email, username: Username };
        } catch (error) {
            throw new Error(`Firebase signup error: ${error.message}`);
        }
    }
    //for Email verification
    // async verifyUser(userId) {
    //     try {
    //         const db = admin.firestore();
    //         const userRef = db.collection("users").doc(userId);
    //         await userRef.update({
    //             verified: true,
    //             verifiedAt: admin.firestore.FieldValue.serverTimestamp()
    //         });
    //         return { success: true, userId: userId };
    //     } catch (error) {
    //         throw new Error(`Firebase verification error: ${error.message}`);
    //     }
    // }

    async verifyPhoneOTP({idToken}) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            const db = admin.firestore();
            const userRef = db.collection("users").doc(decodedToken.uid);

            await userRef.update({
                phoneNumber: decodedToken.phone_number,
                verified: true,
                verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
            });

            return { success: true, uid: decodedToken.uid, phoneNumber: decodedToken.phone_number };
        } catch (error) {
            throw new Error(`Firebase phone verification error: ${error.message}`);
        }
    }


   }

module.exports = new SignUpRepository();
