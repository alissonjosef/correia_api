import { s3Client } from "./aws";

const multer = require("multer");
const multerS3 = require("multer-s3");

const upload = multer({
  storage: multerS3({
    s3: s3Client, // Crie uma nova instância do cliente S3
    bucket: "correia",
    metadata: function (req: any, file: any, cb: any) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (eq: any, file: any, cb: any) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;

/* const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "uploads/");
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
 */
