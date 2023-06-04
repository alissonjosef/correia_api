const { S3Client } = require("@aws-sdk/client-s3");

export const s3Client = new S3Client({
  region: "us-east-2", // Insira a região correta do seu bucket S3
  credentials: {
    accessKeyId: `${process.env.AWSaccessKeyId}`,
    secretAccessKey: `${process.env.AWSsecretAccessKey}`,
  },
});


