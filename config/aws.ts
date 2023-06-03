const { S3Client } = require("@aws-sdk/client-s3");

export const s3Client = new S3Client({
  region: "us-east-2", // Insira a região correta do seu bucket S3
  credentials: {
    accessKeyId: "AKIAZY4NX3JNELAQQG6W",
    secretAccessKey: "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",
  },
});


