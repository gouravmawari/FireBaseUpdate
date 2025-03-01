const { ValidationError } = require("../utils/error.utils");
const PostService = require("../service/post.service");
class PostController{
    constructor(PostService){
        this.PostService = PostService
    }
    async createPost(req,res,next){
        let{type,text,URL,userID}= req.body;
        try{

            if(!type || !userID){
                let missingFields = [];
                if(!type){
                    missingFields.push("type")
                }
                if(!userID){
                    missingFields.push("userID");
                }
                return res.sendError(
                    new ValidationError({
                        message: `Missing fields: ${missingFields.join(", ")}`,
                        details: missingFields
                    })
                );
            }
            const create = await this.PostService.createPost({type,text,URL,userID});
            if(!create) {
                return res.sendError(
                  new Error("Failed to create Post")
                );
              }
            return res.status(201).json({ success: true, data: create });
        }
        catch(err){
            console.log(err);
            return res.status(400).json(err);
        }
    }
}
module.exports = new PostController(PostService);