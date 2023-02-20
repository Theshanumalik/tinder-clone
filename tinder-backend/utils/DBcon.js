const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
async function DBcon(DBURI) {
  try {
    await mongoose.connect(DBURI);
    console.log("CONNECTED TO THE DATABASE");
  } catch (error) {
    console.log("Failed to connect to the database😥😥", error);
  }
}

module.exports = DBcon;
