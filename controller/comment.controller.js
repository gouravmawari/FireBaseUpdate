const { ValidationError } = require("../utils/error.utils");
const CommentService = require("../service/comment.service");
class CommentController{
    constructor(CommentService){
        this.CommentService = CommentService;
    }
    async CreateComment(req,res,next){
        const {postID,userID,text} = req.body;
        console.log({postID,userID,text})
        try{
            if(!postID || !userID || !text){
                let missingFields = [];
                if(!postID){
                    missingFields.push("postID");
                }
                if(!userID){
                    missingFields.push("userID");
                }
                if(!text){
                    missingFields.push("text");
                }
                return res.sendError(
                    new ValidationError({
                        message: `Missing fields: ${missingFields.join(", ")}`,
                        details: missingFields
                    })
                );
                
            }
            const Comment = await this.CommentService.CreateComment({postID,userID,text});
                if(!Comment){
                    return res.sendError(
                        new Error("failed to create Comment")
                    );
                }
                return res.status(201).json({ success: true, data: Comment });
        }catch(err){
            console.log(err);
            return res.status(400).json(err);
        }
    }


    async CommentReply(req,res,next){
        const{commentID,userID,text} = req.body;
        console.log({commentID,userID,text})
        try{
            if(!commentID || !userID || !text){
                let missingFields = [];
                if(!commentID){
                    missingFields.push("commentID");
                }
                if(!userID){
                    missingFields.push("userID");
                }
                if(!text){
                    missingFields.push("text");
                }
                return res.sendError(
                    new ValidationError({
                        message: `Missing fields: ${missingFields.join(", ")}`,
                        details: missingFields
                    })
                );
                
            }
            const CreateReply = await this.CommentService.Reply({commentID,userID,text});
                if(!CreateReply){
                    return res.sendError(
                        new Error("failed to reply")
                    );
                }
                return res.status(201).json({ success: true, data: CreateReply });
        }catch(err){
            console.log(err);
            return res.status(400).json(err);
        }
    }
    
}

module.exports = new CommentController(CommentService);