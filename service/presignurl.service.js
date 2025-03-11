const presignedUrlRepository = require("../repositories/presignurl.respositories");
const { PostType } = require("../constant/post_type");

class PresignedUrlService {
    constructor() {
        this.presignedUrlRepository = presignedUrlRepository;
    }

    async generateUrls({ filetype, post_type, userid }) {
        if (!filetype || !post_type || !userid) {
            throw new Error("Missing required parameters: filetype, post_type, userid");
        }

        const extension = filetype.split("/")[1];
        const now = Date.now();
        let s3Key = "";

        if (post_type === PostType.Video) {
            s3Key = `${PostType.Video}/${userid}/${now}.${extension}`;
        } else if (post_type === PostType.Photo) {
            s3Key = `${PostType.Photo}/${userid}/${now}.${extension}`;
        } else if (post_type === PostType.Thumbnail) {
            s3Key = `${PostType.Thumbnail}/${userid}/${now}.${extension}`;
        } else {
            throw new Error("Invalid post type");
        }

        const mediaUrlData = await this.presignedUrlRepository.generatePresignedUrl({ s3Key, filetype });

        return {
            mediaUrl: mediaUrlData.fileUrl,
            presignedUrl: mediaUrlData.presignedUrl
        };
    }
}

module.exports = new PresignedUrlService();
