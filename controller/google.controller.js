const GoogleService = require("../service/google.service");
class GoogleController {
    constructor(GoogleService) {
        this.GoogleService = GoogleService;
    }
    
    async GoogleSignUp(req,res,next){
        const{token_id} = req.body;
        try{
            if(!token_id){
                return res.sendError(
                    new ValidationError({
                        message: "token ID missing",
                        details: missingFields
                    })
                );
            }
            const resp = await GoogleService.googleSignup({token_id});
            return res.status(201).json({ success: true, data: resp });
        }catch(err){
            return res.status(400).json({ error: err.message });
            console.log(err);
            next();
        }
    }

 
}

module.exports = new GoogleController(GoogleService);