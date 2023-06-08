import { loginController } from "../controller/loginController";
import { authenticate } from "../middleware/authenticate";

const router = require("express").Router();

router.route("/login").post((req: any, res: any) => {
  loginController.login(req, res);
});

router.route("/register").post((req: any, res: any) => {
  loginController.register(req, res);
});


router.route("/user/profile").get(authenticate, (req: any, res: any) => {
    loginController.profile(req, res);
  });

  module.exports = router;