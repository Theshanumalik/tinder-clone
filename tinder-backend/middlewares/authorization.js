const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
function authorization(req, res, next) {
  try {
    const token = req.header("token");
    const { uid } = jwt.verify(token, JWT_SECRET);
    req.userId = uid;
    next();
  } catch (error) {
    res.json(error.message);
  }
}

module.exports = authorization;
