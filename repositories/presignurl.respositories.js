const generateS3PresignedUrl = require("../aws/presignedURL.aws");
class PresignedUrlRepository {
    async generatePresignedUrl({ s3Key, filetype }) {
        return await generateS3PresignedUrl({ s3Key, filetype });
    }
}

module.exports = new PresignedUrlRepository();
