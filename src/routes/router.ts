const router = require("express").Router();

const servicesRouter = require("./services");
const loginRouter = require("./login");

router.use("/", servicesRouter);
router.use("/", loginRouter);

module.exports = router;
