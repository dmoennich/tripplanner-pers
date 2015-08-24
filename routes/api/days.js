// days.js
var express = require("express");
var router = express.Router();



router.get("/alldays", function(req, res) {
	// get all days
});

router.get("/:day_id", function(req, res) {
	// get one day
	var day_id = req.params.day_id;
});

router.post("/newday", function(req, res) {
	// save current day
	console.log(req.body);
	res.send("New day posted");
});

router.delete("/:day_id", function(req, res) {
	// delete day
	var day_id = req.params.day_id;
	res.send();
});

router.post("/:day_id/:restaurants/:restaurant_id", function(req, res) {
	// add restaurant
	var restaurant_id = req.params.restaurant_id;
	res.send();
});

router.delete("/:day_id/:restaurants/:restaurant_id", function(req, res) {
	// delete restaurant
	var restaurant_id = req.params.restaurant_id;
	res.send();
});

router.post("/:day_id/:activities/:activity_id", function(req, res) {
	// add activity
	var activity_id = req.params.activity_id;
});

router.delete("/:day_id/:activities/:activity_id", function(req, res) {
	// delete activity
	var activity_id = req.params.activity_id;
});

router.post("/:day_id/:hotels/:hotel_id", function(req, res) {
	// add hotel
	var hotel_id = req.params.hotel_id;
});

router.delete("/:day_id/:hotels/:hotel_id", function(req, res) {
	// delete hotel
	var hotel_id = req.params.hotel_id;
});

module.exports = router;
