const Schedule = require("./models/schedule");
const { notify } = require("./mail/index");

const handleCron = async () => {
  try {
    const oneday = new Date() - 60 * 60 * 24 * 1000;
    let month = new Date();
    let week = new Date();
    week.setDate(week.getDay() + 1);
    month.setMonth(month.getMonth() + 7);
    const conditionDaily = { cronDaily: { $lte: oneday } };
    const conditionWeekly = { cronWeekly: { $lte: week } };
    const conditionMonthly = { cronMonthly: { $lte: month } };

    const updateDaily = [
      {
        $set: {
          cronDaily: new Date(),
        },
      },
    ];

    const updateWeekly = [
      {
        $set: {
          cronWeekly: new Date(),
        },
      },
    ];

    const updateMonthly = [
      {
        $set: {
          cronMonthly: new Date(),
        },
      },
    ];

    Schedule.find()
      .exec()
      .then((docs) => {
        docs.map((doc) => {
          if (conditionDaily) {
            if (doc.schedule === "Daily") {
              console.log(doc.schedule, doc.email);
              notify(doc.email, doc.subject, doc.file);
            }
          }

          if (doc.schedule === "weekly") {
            notify(doc.email, doc.subject, doc.file);
          }

          if (doc.schedule === "monthly") {
            notify(doc.email, doc.subject, doc.file);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });

    const option = { multi: true };
    await Schedule.updateMany(conditionDaily, updateDaily, option);
    await Schedule.updateMany(conditionWeekly, updateWeekly, option);
    await Schedule.updateMany(conditionMonthly, updateMonthly, option);
  } catch (e) {
    console.log(e);
  }
};

module.exports = handleCron;
