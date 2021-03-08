const express = require("express");
const router = express.Router();

const scheduleCtrl = require("../controllers/schedule");



router.post("/", scheduleCtrl.scheduleCreate);


router.get("/", scheduleCtrl.getAllSchedule);


router.delete("/:id", scheduleCtrl.scheduleDelete);






module.exports = router;
