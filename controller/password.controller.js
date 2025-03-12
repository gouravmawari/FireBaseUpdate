const PasswordService = require("../service/password.service");

class PasswordController {
    constructor(PasswordService) {
        this.PasswordService = PasswordService;
    }

    async sendPasswordReset(req, res, next) {
        const { email } = req.body;
        try {
            if (!email) {
                return res.sendError(
                    new ValidationError({
                        message: "email not provided",
                        details: missingFields
                    })
                );
            }

            const resp = await this.PasswordService.setPassword({ email });
            return res.status(200).json(resp);
        } catch (error) {
            next(error); 
        }
    }
}

module.exports = new PasswordController(PasswordService);
