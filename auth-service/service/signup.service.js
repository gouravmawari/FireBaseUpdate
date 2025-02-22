const SignUpRepository = require("../repositories/signup.repositories");
class SignUpService {
    constructor(SignUpRepository) {
        this.SignUpRepository = SignUpRepository;
    }
    async SignUp({ Email, Password }) {
        return this.SignUpRepository.SignUp({ Email, Password });
    }
}
module.exports = new SignUpService(SignUpRepository);
