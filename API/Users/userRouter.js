const { signIn, signUp } = require("./userControllers");

const router = require("express").Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
module.exports = router;
