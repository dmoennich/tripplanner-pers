// days.js
var express = require("express");
var router = express.Router();


router.get("/days/alldays", function(req, res) {
	// get all days
});

router.get("/days/:day_id", function(req, res) {
	// get one day
});

router.post("/days/newday", function(req, res) {
	// save current day
});

router.delete("/days/:day_id", function(req, res) {
	// delete day
});

router.post("/days/:day_id/:restaurants/:restaurant_id", function(req, res) {
	// add restaurant
});

router.delete("/days/:day_id/:restaurants/:restaurant_id", function(req, res) {
	// delete restaurant
});

router.post("/days/:day_id/:activities/:activity_id", function(req, res) {
	// add activity
});

router.delete("/days/:day_id/:activities/:activity_id", function(req, res) {
	// delete activity
});

router.post("/days/:day_id/:hotels/:hotel_id", function(req, res) {
	// add hotel
});

router.delete("/days/:day_id/:hotels/:hotel_id", function(req, res) {
	// delete hotel
});

module.exports = router;
