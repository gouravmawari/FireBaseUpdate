const CommentRepository = require("../repositories/comment.repositories");
class CommentService{
    constructor(CommentRepository){
        this.CommentRepository = CommentRepository;
    }
    async CreateComment({postID,userID,text}){
        return this.CommentRepository.Comment({postID,userID,text})
    }
    async Reply({commentID,userID,text}){
        return this.CommentRepository.reply({commentID,userID,text});
    }
}
module.exports= new CommentService(CommentRepository);