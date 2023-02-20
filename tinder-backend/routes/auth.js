const trimValues = require("../middlewares/trimValue");
const User = require("../modal/User");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const checkVerrified = require("../utils/checkVerrified");

const JWT_SECRET = process.env.JWT_SECRET;

router.use(trimValues);
router.post("/register", async (req, res) => {
  const { password, email } = req.body;
  try {
    const isExist = await User.findOne({ email });
    if (isExist) return res.status("401").json("NOT A VALID EMAIL");
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: hashPassword });
    const { password: hashPass, ...others } = user._doc;
    const token = jwt.sign({ uid: user._id, varrified: false }, JWT_SECRET);
    res.json({ token, user: others });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status("401").json("INVALID EMAIL OR PASSWORD");
    const { password: hashPassword, ...others } = user._doc;
    const matchPassword = await bcrypt.compare(password, hashPassword);
    if (!matchPassword)
      return res.status("401").json("INVALID EMAIL OR PASSWORD");
    const token = jwt.sign(
      { uid: user._id, varrified: checkVerrified(user._doc) },
      JWT_SECRET
    );
    res.json({ token, user: others });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ERROR_MESSAGE: error.message, ERROR_TYPE: error.type });
  }
});
module.exports = router;
