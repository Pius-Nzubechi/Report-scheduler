const mongoose = require("mongoose");
const { notify } = require("../mail/index");

const Schedule = require("../models/schedule");

exports.scheduleCreate = (req, res, next) => {
  const schedule = new Schedule({
    _id: new mongoose.Types.ObjectId(),
    file: req.body.file,
    email: req.body.email,
    subject: req.body.subject,
    schedule: req.body.schedule,
  });
  if (req.body.schedule === "Immediately") {
    notify(req.body.email, req.body.subject, req.body.file);
  }
  schedule
    .save()
    .then((result) => {
      res.status(201).json({
        message: "successful",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// get all schedule
exports.getAllSchedule = (req, res, next) => {
  Schedule.find()
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        reports: docs.map((doc) => {
          return {
            _id: doc._id,
            email: doc.email,
            file: doc.file,
            subject: doc.subject,
            schedule: doc.schedule,
            request: {
              type: "GET",
              url: "http://localhost:2000/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// delete a schedule
exports.scheduleDelete = (req, res, next) => {
  const id = req.params.id;
  Schedule.findByIdAndDelete(id)
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:2000/products",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
