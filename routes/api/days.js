// days.js
var express = require("express");
var router = express.Router();
var Day = require("../../models/day");


router.get("/alldays", function(req, res) {
	// get all days
	Day.find({})
		.populate([{path: "restaurants"}, {path: "activities"}, {path: "hotel"}])
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
	// add a new day
	var day = new Day(req.body);
	day.save()
	.then(function(newday) {
		return Day.find({});
	})
	.then(function(arr) {
		var promiseArray = [];
		arr.forEach(function(entry, index) {
			entry.number = index + 1;
			promiseArray.push(entry.save());
		});
		return Promise.all(promiseArray);
	})
	.then(function(proms) {
		res.json([proms.length-1]);
	})
	.then(null, function (error) {
		res.status(500);
		res.json(error);
	})
});

router.delete("/:day_id", function(req, res) {
	// delete day
	var day_id = req.params.day_id;
	Day.remove({_id: day_id})
	.then(function(newday) {
		return Day.find({});
	})
	.then(function(arr) {
		var promiseArray = [];
		arr.forEach(function(entry, index) {
			entry.number = index + 1;
			promiseArray.push(entry.save());
		});
		return Promise.all(promiseArray);
	})
	.then(function(arr) {
		var promiseArray = [];
		arr.forEach(function(entry, index) {
			entry.number = index + 1;
			promiseArray.push(entry.save());
		});
	return Promise.all(promiseArray);
	})
	.then(function(proms) {
		res.json([proms.length-1]);
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
			if (day.restaurants.indexOf(restaurant_id) === -1) {
			day.restaurants.push(restaurant_id);
			return day.save();			}
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
	var day_id = req.params.day_id;
	var restaurant_id = req.params.restaurant_id;

	Day.findOne({_id: day_id})
		.then(function (day) {
			var index = day.restaurants.indexOf(restaurant_id);
			if (index !== -1){
				day.restaurants.splice(index, 1);
			}
			return day.save();
		})
		.then(function(updatedDay){
			res.json(updatedDay);
		})
		.then(null, function (error) {
			res.status(500);
			res.json(error);
		});

});

router.post("/:day_id/:activities/:activity_id", function(req, res) {
	// add activity
	var day_id = req.params.day_id;
	var activity_id = req.params.activity_id;
	
	Day.findOne({_id: day_id})
		.then(function (day) {
			if (day.restaurants.indexOf(restaurant_id) === -1) {
				day.activities.push(activity_id);
				return day.save();
			}
		})
		.then(function (savedDay) {
			res.json(savedDay);
		})
		.then(null, function (error) {
			res.status(500);
			res.json(error);
		});
});

router.delete("/:day_id/:activities/:activity_id", function(req, res) {
	// delete activity
	var day_id = req.params.day_id;
	var activity_id = req.params.activity_id;

	Day.findOne({_id: day_id})
		.then(function (day) {
			var index = day.activities.indexOf(activity_id);
			if (index !== -1){
				day.activities.splice(index, 1);
			}
			return day.save();
		})
		.then(function(updatedDay){
			res.json(updatedDay);
		})
		.then(null, function (error) {
			res.status(500);
			res.json(error);
		});
});

router.post("/:day_id/:hotels/:hotel_id", function(req, res) {
	// add hotel
	var day_id = req.params.day_id;
	var hotel_id = req.params.hotel_id;
	
	Day.findOne({_id: day_id})
		.then(function (day) {
			day.hotel = hotel_id;
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

router.delete("/:day_id/:hotels/:hotel_id", function(req, res) {
	// delete hotel
	var day_id = req.params.day_id;
	var hotel_id = req.params.hotel_id;

	Day.findOne({_id: day_id})
		.then(function (day) {
			day.hotel = undefined;
			return day.save();
		})
		.then(function(updatedDay){
			res.json(updatedDay);
		})
		.then(null, function (error) {
			res.status(500);
			res.json(error);
		});

});

module.exports = router;
