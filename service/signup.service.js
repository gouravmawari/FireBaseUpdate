const SignUpRepository = require("../repositories/signup.repositories");
class SignUpService {
    constructor(SignUpRepository) {
        this.SignUpRepository = SignUpRepository;
    }
    async SignUp({Email,Password,Username}) {
        return this.SignUpRepository.SignUp({Email,Password,Username});
    }
}
module.exports = new SignUpService(SignUpRepository);
