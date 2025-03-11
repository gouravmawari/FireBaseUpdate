const PresignedUrlService = require("../service/presignurl.service");
const { PostType } = require("../constant/post_type");

class PresignURLController {
    constructor() {
        this.PresignedUrlService = PresignedUrlService;
    }

    async genpresignurl(req, res, next) {
        const { post_type, filetype, userid, thumbnail } = req.body;
        console.log("hello ")
        try {
            const missingFields = [];

            if (!filetype) missingFields.push("filetype");
            if (!userid) missingFields.push("userid");
            if (post_type === PostType.Video && !thumbnail) missingFields.push("thumbnail");

            if (missingFields.length > 0) {
                return res.status(400).json({ error: `Missing fields: ${missingFields.join(", ")}` });
            }

            let response;
            if (post_type === PostType.Video) {
                const videoResponse = await this.PresignedUrlService.generateUrls({ filetype, post_type, userid });
                const thumbnailResponse = await this.PresignedUrlService.generateUrls({ 
                    filetype: "image/png", 
                    post_type: PostType.Thumbnail, 
                    userid 
                });

                response = {
                    video_URL: videoResponse.mediaUrl,
                    video_presignURL: videoResponse.presignedUrl,
                    thumb_URL: thumbnailResponse.mediaUrl,
                    thumb_presignURL: thumbnailResponse.presignedUrl
                };
            } else {
                const mediaResponse = await this.PresignedUrlService.generateUrls({ filetype, post_type, userid });
                response = {
                    media_URL: mediaResponse.mediaUrl,
                    presign_URL: mediaResponse.presignedUrl
                };
            }

            return res.json(response);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new PresignURLController();
