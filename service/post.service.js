const PostRepository = require("../repositories/post.repositores");
class PostService{
    constructor(PostRepository){
        this.PostRepository = PostRepository;
    }

    async createPost({type,text,URL,userID}){
        return this.PostRepository.createPost({type,text,URL,userID})
    }
}

module.exports = new PostService(PostRepository);