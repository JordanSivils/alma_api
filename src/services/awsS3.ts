import sharp from "sharp";
import { buffer } from "stream/consumers";
import crypto from 'crypto';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


const awsAccessKey: string = process.env.AWS_ACCESS_KEY || '';
const awsSecretKey: string = process.env.AWS_SECRET_KEY || '';
const awsRegion: string = process.env.AWS_BUCKET_REGION || '';
const awsBucketName: string = process.env.AWS_BUCKET_NAME || '';
const awsFolderName : string = process.env.AWS_FOLDER_NAME || '';

const processImage = async (buffer: Buffer) => {
  try {
    const result = await sharp(buffer)
      .resize(500) // width
      .toFormat("webp", { quality: 85 })
      .toBuffer();
      console.log('image processed to webP');
      return result
  } catch (error) {
    console.error('Error converting image to WebP:', error);
        throw error;
  }
};

const generateFileName = (originalName: string) => {
  const fileExt = originalName.split('.').pop();
  return crypto.randomBytes(16).toString('hex') + '.' + fileExt;
};

const s3Client = new S3Client({
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey,
  },
  region: awsRegion
})

export const uploadImageToS3 = async (buffer: Buffer, filename: string, mimetype: string) => {
  const processedImage = await processImage(buffer);
  const uniqueFilename = generateFileName(filename);
  const key = awsFolderName + uniqueFilename;
  const uploadParams = {
    Bucket: awsBucketName,
    Key: key,
    Body: processedImage,
    ContentType: mimetype
  };

  await s3Client.send(new PutObjectCommand(uploadParams));
  return key
}

export const deleteImageFromS3 = async (key: string) => {
  const deleteParams = {
    Bucket: awsBucketName,
    Key: key
  };

  await s3Client.send(new DeleteObjectCommand(deleteParams))
};