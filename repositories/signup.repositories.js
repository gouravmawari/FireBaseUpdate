const admin = require("../../common-utils/config/firebase.config");

class SignUpRepository {
    async SignUp({ Email, Password }) {
        try {
            return await admin.auth().createUser({
                email: Email,
                password: Password,
                emailVerified: false,
                disabled: false 
            });
        } catch (error) {
            throw new Error(`Firebase signup error: ${error.message}`);
        }
    }
}

module.exports = new SignUpRepository();
