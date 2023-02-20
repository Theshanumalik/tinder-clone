const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Types.ObjectId, required: true },
    to: { type: mongoose.Types.ObjectId, required: true },
    isAccepted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Request = mongoose.model("request", requestSchema);

module.exports = Request;
