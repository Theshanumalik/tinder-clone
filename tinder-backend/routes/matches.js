const authorization = require("../middlewares/authorization");
const Request = require("../modal/Request");
const User = require("../modal/User");

const router = require("express").Router();

router.use(authorization);
router.get("/recommendations", async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    if (!currentUser.intrestedIn) {
      return res.status(402).json("PLEASE COMPLETE YOUR PROFILE FIRST!!");
    }
    const recommendation = await User.find({
      $and: [
        { gender: currentUser.intrestedIn },
        {
          "matches.uid": { $ne: currentUser._id },
        },
      ],
    })
      .select("-matches -email")
      .limit(10)
      .sort({ createdAt: -1 });
    res.json(recommendation);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.post("/request/:uid", async (req, res) => {
  try {
    const user = await User.findOne({
      $and: [
        { _id: req.params.uid },
        {
          "matches.uid": { $ne: req.userId },
        },
      ],
    });
    if (!user) {
      return res.status(400).json("Already friends");
    }
    const isRequested = await Request.findOne({
      $or: [{ from: req.userId }, { to: req.userId }],
    });
    if (isRequested) {
      return res.status(400).json("REQUEST ALREADY SENT TO HIM/HER!!");
    }
    const newRequest = await Request.create({
      from: req.userId,
      to: req.params.uid,
    });
    res.json(newRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.post("/accept/:uid", async (req, res) => {
  const isRequested = await Request.findOne({
    $and: [{ from: req.params.uid }, { to: req.userId }, { isAccepted: false }],
  });
  if (!isRequested) {
    return res.status(400).json("NO REQUEST FOUND!!");
  }
  isRequested.isAccepted = true;
  await isRequested.save();
  await User.findByIdAndUpdate(req.params.uid, {
    $push: {
      matches: { uid: req.userId },
    },
  });
  await User.findByIdAndUpdate(req.userId, {
    $push: {
      matches: { uid: req.params.uid },
    },
  });
  res.json("YOU ARE FRIENDS NOW!!");
});
router.get("/", async (req, res) => {
  const matchUsers = [];
  const match = await Request.find({
    $and: [
      {
        $or: [{ from: req.userId }, { to: req.userId }],
      },
      { isAccepted: true },
    ],
  });
  for (i = 0; i < match.length; i++) {
    const user = await User.findById(
      match[i].to == req.userId ? match[i].from : match[i].to
    ).select("-email");
    matchUsers.push(user);
  }
  res.json(matchUsers);
});
module.exports = router;
