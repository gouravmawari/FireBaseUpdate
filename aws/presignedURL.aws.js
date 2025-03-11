const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
let S3_BUCKET_NAME = "";
let AWS_REGION = "";
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
  const s3 = new S3Client({
    region: "",
    credentials: {
      accessKeyId:"",
      secretAccessKey:"",
    },
  });

  async function generateS3PresignedUrl({  s3Key, filetype  }) {

    const command = new PutObjectCommand({
      Bucket: "",
      Key: s3Key,
      ContentType: filetype,
      ACL: "public-read",
    });

    try {
      const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 300 }); 
      const fileUrl = `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${s3Key}`;
      return { presignedUrl, fileUrl };
    } catch (error) {
      throw error;
    }
  }

  module.exports = generateS3PresignedUrl;