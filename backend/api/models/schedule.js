const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const scheduleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  file: { type: String },
  email: {
    type: String,

    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  subject: { type: String },
  schedule: { type: String },
  cronDate: { type: Date, default: Date.now() },
  cronWeek: { type: Date, default: Date.now() },
  cronMonth: { type: Date, default: Date.now() },
});

scheduleSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Schedule", scheduleSchema);
