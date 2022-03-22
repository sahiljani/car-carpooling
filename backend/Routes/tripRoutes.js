const express = require("express");
const { isSignedin } = require("../Controllers/authenticate");

var router = express.Router()
const { drive, ride, cancelTrip, tripDone, tripHistory, activeTrip } = require("../Controllers/trip.js");

router.get("/trip", isSignedin, activeTrip)
router.post("/trip/drive", isSignedin, drive)
router.post("/trip/ride", isSignedin, ride)
router.delete("/trip", isSignedin, cancelTrip)
router.post("/trip/done", isSignedin, tripDone)
router.get("/trips", isSignedin, tripHistory)
module.exports = router;
