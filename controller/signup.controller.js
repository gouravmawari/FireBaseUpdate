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
            next();
        }
    }

    async VerifyPhoneOTP(req,res,next){
        const {idToken} = req.body;
        try{
            if(!idToken){
                return res.sendError(
                    new ValidationError({
                        message: "token ID missing",
                        details: missingFields
                    })
                );
            }
            const resp = await SignUpService.VerifyPhoneOTP({idToken});
            return res.status(201).json({ success: true, data: resp });
        }
        catch(err){
            return res.status(400).json({ error: err.message });
            console.log(err);
            next();
        }
    }
 
}

module.exports = new SignUpController(SignUpService);


   // async Verify(req,res,next){
    //     const{userId} = req.params;
    //     try{
    //         if(!userId){
    //             return res.Error(
    //                 new ValidationError({
    //                     message:"userId not provided",
    //                     details: missingFields
    //                 })
    //             );
    //         }
    //         const verify = await this.SignUpService.Verify({userId});
    //         return res.status(201).json("Data Base updated") 
    //     }catch(err){
    //         console.log(err);
    //         return res.status(400).json({ error: err.message });
    //         next();
    //     }
    // }