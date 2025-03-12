const SignUpRepository = require("../repositories/signup.repositories");
const GoogleAuth = require("../auth/google.auth");

class SignUpService {
    constructor(SignUpRepository, GoogleAuth) {
        this.SignUpRepository = SignUpRepository;
        this.GoogleAuth = GoogleAuth;
    }

    async SignUp({ Email, Password, Username }) {
        return this.SignUpRepository.SignUp({ Email, Password, Username });
    }

    // async Verify({ userId }) {
    //     return this.SignUpRepository.verifyUser({ userId });
    // }

    async googleSignup({ token_id }) {
        return this.GoogleAuth.verifyGoogleAuth({ token_id });
    }
    async VerifyPhoneOTP({idToken}) {
        return this.SignUpRepository.verifyPhoneOTP({ idToken });
    }
}

module.exports = new SignUpService(SignUpRepository, GoogleAuth);
