const { ValidationError } = require("../utils/error.utils");
const SignUpService = require("../service/signup.service");

class SignUpController {
    constructor(SignUpService) {
        this.SignUpService = SignUpService;
    }
    async SignUp(req, res, next) {
        const { Email, Password, Username } = req.body;
        try {
            if (!Email || !Password || !Username) {
                let missingFields = [];
                if (!Email) missingFields.push("Email");
                if (!Password) missingFields.push("Password");
                if (!Username) missingFields.push("Username");

                return res.sendError(
                    new ValidationError({
                        message: `Missing fields: ${missingFields.join(", ")}`,
                        details: missingFields
                    })
                );
            }
            const User = await this.SignUpService.SignUp({ Email, Password, Username });
            if (!User) {
                throw new Error("User not created");
            }
            return res.status(201).json({ success: true, data: User });

        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: err.message });
        }
    }
}

module.exports = new SignUpController(SignUpService);
