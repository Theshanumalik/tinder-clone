const authorization = require("../middlewares/authorization");
const User = require("../modal/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const router = require("express").Router();

router.use(authorization);

router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json(500).json(error.message);
  }
});

router.post("/", async (req, res) => {
  const { firstname, dateOfBirth, gender, intrestedIn, profile } = req.body;
  if (!firstname || !dateOfBirth || !gender || !intrestedIn)
    return res.status(401).json("ALL FIELDS ARE REQUIRED");
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          firstname,
          dateOfBirth,
          gender,
          intrestedIn,
          profile,
        },
      },
      { new: true }
    );
    const token = jwt.sign(
      { uid: updateUser._id, verrified: true },
      JWT_SECRET
    );
    res.json({ token, user: updateUser });
  } catch (error) {
    console.log(error);
    res.status(501).json(error.message);
  }
});

router.get("/:userid", (req, res) => {
  res.json("to see others profile");
});

module.exports = router;
