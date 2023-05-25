import { serviceController } from "../controller/serviceController";

const router = require("express").Router();

const upload = require("../../config/multer");

router
  .route("/product")
  .post(upload.single("imageUrl"), async (req: any, res: any) => {
    serviceController.create(req, res);
  });

router.route("/product").get((req: any, res: any) => {
  serviceController.getAll(req, res);
});

module.exports = router;
