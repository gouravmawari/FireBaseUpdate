const SignUpRepository = require("../repositories/signup.repositories");
class SignUpService {
    constructor(SignUpRepository) {
        this.SignUpRepository = SignUpRepository;
    }
    async SignUp({Email,Password,Username}) {
        return this.SignUpRepository.SignUp({Email,Password,Username});
    }
    async Verify({userId}){
        return this.SignUpRepository.verifyUser({userId});
    }
}
module.exports = new SignUpService(SignUpRepository);
