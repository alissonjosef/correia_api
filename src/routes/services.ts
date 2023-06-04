import { loginController } from "../controller/loginController";
import { serviceController } from "../controller/serviceController";
import { authenticate } from "../middleware/authenticate";

const router = require("express").Router();

const upload = require("../../config/multer");

router.route("/login").post((req: any, res: any) => {
  loginController.login(req, res);
});

router.route("/register").post((req: any, res: any) => {
  loginController.register(req, res);
});

router.route("/user/profile").get(authenticate, (req: any, res: any) => {
  loginController.profile(req, res);
});
router.route("/product").get((req: any, res: any) => {
  serviceController.getAll(req, res);
});

router
  .route("/product")
  .post(upload.single("imageUrl"), authenticate, async (req: any, res: any) => {
    serviceController.create(req, res);
  });

router.route("/product/:id").delete(authenticate, (req: any, res: any) => {
  serviceController.deleteProduct(req, res);
});

router
  .route("/product/:id")
  .put(upload.single("imageUrl"), authenticate, async (req: any, res: any) => {
    serviceController.updateProduct(req, res);
  });

module.exports = router;
