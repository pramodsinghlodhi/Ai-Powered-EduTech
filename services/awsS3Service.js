const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'your-access-key',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'your-secret-key'
  }
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || 'edu-creative-bucket';

const uploadToS3 = async (fileBuffer, fileName, mimeType) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType,
    // Note: Do NOT set public-read for course recordings or proprietary videos.
  };

  try {
    const data = await s3.send(new PutObjectCommand(params));
    return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  } catch (err) {
    console.error('S3 Upload Error:', err);
    throw err;
  }
};

/**
 * Generates a short-lived URL for private playback.
 * Short-lived expiry (2 hours) to prevent unauthorized link sharing.
 */
const getPrivateUrl = async (fileKey) => {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 7200 }); // 2 hours
    return url;
  } catch (err) {
    console.error('S3 Pre-signed URL Error:', err);
    throw err;
  }
};

module.exports = { uploadToS3, getPrivateUrl };
