// days.js
var express = require("express");
var router = express.Router();
var Day = require("../../models/day");



router.get("/alldays", function(req, res) {
	// get all days
	Day.find({})
		.then( function (day) {
			res.json(day);
		})
		.then(null, function (error) {
			res.status(500);
			res.json(error);
		});
});

router.get("/:day_id", function(req, res) {
	// get one day
	var day_id = req.params.day_id;
	Day.findOne({_id: day_id})
		.then( function (day) {
			res.json(day);
		})
		.then(null, function (error) {
			res.status(500);
			res.json(error);
		});
});

router.post("/newday", function(req, res) {
	var day = new Day(req.body);
	day.save()
		.then(function (newDay) {
			res.json(newDay);
		})
		.then(null, function (error) {
			res.status(500);
			res.json(error);
		});
});

router.delete("/:day_id", function(req, res) {
	// delete day
	var day_id = req.params.day_id;
	Day.remove({_id: day_id})
		.then(function () {
			res.json({});
		})
		.then(null, function (error) {
			res.status(500);
			res.json(error);
		});
});

router.post("/:day_id/restaurants/:restaurant_id", function(req, res) {
	// add restaurant
	var restaurant_id = req.params.restaurant_id;
	var day_id = req.params.day_id;
	
	Day.findOne({_id: day_id})
		.then(function (day) {
			day.restaurants.push(restaurant_id);
			return day.save();
		})
		.then(function (savedDay) {
			res.json(savedDay);
		})
		.then(null, function (error) {
			res.status(500);
			res.json(error);
		});
});

router.delete("/:day_id/restaurants/:restaurant_id", function(req, res) {
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
