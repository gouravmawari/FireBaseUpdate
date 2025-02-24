const { ValidationError } = require("../utils/error.utils");
const SignUpService = require("../service/signup.service");

class SignUpController {
    constructor(SignUpService) {
        this.SignUpService = SignUpService;
    }

    async SignUp(req, res, next) {
        const { Email, Password } = req.body; 
        try {
            if (!Email || !Password) {
                return res.sendError(
                    new ValidationError({
                    message: "Email or Password is missing",
                    details: missingFields,
                    })
                )
            }
            const User = await this.SignUpService.SignUp({ Email, Password });

            if (!User) {
                throw new Error("User not created");
            }

            return res.status(201).json({ data: User });

        } catch (err) {
           return res.status(400).json(err);
        }
    }
}

module.exports = new SignUpController(SignUpService);
