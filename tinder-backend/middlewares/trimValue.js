function trimValues(req, res, next) {
  for (const key in req.body) {
    if (typeof req.body[key] != "string") continue;
    req.body[key] = req.body[key].trim();
  }
  next();
}
module.exports = trimValues;
