const express = require("express");
const cors = require("cors");
const DBcon = require("./utils/DBcon");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
DBcon("mongodb://localhost:27017/tinder-clone");

app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/matches", require("./routes/matches"));

app.listen(PORT, () => {
  console.log("LISTENT AT PORT :", PORT);
});
