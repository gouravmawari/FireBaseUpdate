const GoogleAuth = require("../auth/google.auth");

class GoogleService {
    constructor( GoogleAuth) {
        this.GoogleAuth = GoogleAuth;
    }
    async googleSignup({ token_id }) {
        return this.GoogleAuth.verifyGoogleAuth({ token_id });
    }

}

module.exports = new GoogleService(GoogleAuth);
