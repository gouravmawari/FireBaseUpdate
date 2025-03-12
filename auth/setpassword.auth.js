const admin = require("../firebase.config");

async function setpassword({ email }) {
    try {
        const userRecord = await admin.auth().getUserByEmail(email);

        if (userRecord.providerData.some(provider => provider.providerId === "google.com")) {
            const resetLink = await admin.auth().generatePasswordResetLink(email);
            return { success: true, message: "Password reset email sent", resetLink };
        }

        return { success: true, message: "User already has a password set" };
    } catch (error) {
        throw new Error(`Firebase Google Auth error: ${error.message}`);
    }
}

module.exports = setpassword;
