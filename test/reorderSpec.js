var expect = require("chai").expect;
var request = require("supertest");
var app = require("../app.js");
var Day = require("../models/day");


describe("DELETE api/days/:id", function () {
	var day,
		middleDay,
		lastDay;
	beforeEach(function (done) {
		Day.remove({})
			.then(function () {
				console.log("Removed all days");
				//day = new Day({number: 1});
				//return day.save();
				return Day.create([{number: 1}, {number: 2}, {number: 3}]);
			})
			.then(function (days) {
				console.log("Created days");
				console.log("days:", days);
				day = days[0];
				middleDay = days[1];
				lastDay = days[2];
				done();
			})
			.then(null, function (error) {
				console.log(error);
				throw error;
			});
	});

	it("should get all days", function (done) {
		request(app)
			.get("/api/days/alldays")
			.expect("Content-Type", "application/json; charset=utf-8")
			.expect(200)
			.end(function (err, res) {
				if (err) {
					return done(err);
				}
				done();
			});
	});


	it("should remove the day with the given id", function (done) {
		var dayId = day._id.toString();
		request(app)
			.delete("/api/days/" + day._id.toString())
			.expect(200)
			.end(function (err, res) {
				if (err) {
					return done(err);
				}
				// check if gone from DB
				Day.findOne({_id: dayId})
				.then(function (theDay) {
					expect(theDay).to.equal(null);
					done();
				})
				.then(null, function (error) {
					done(error);
				});
				
			});
	});




	it("should remove the day with the given id and reorder the numbers of the left days", function (done) {
		request(app)
			.delete("/api/days/" + middleDay._id.toString())
			.expect(200)
			.end(function (err, res) {
				if (err) {
					return done(err);
				}
				// check if gone from DB
				Day.findOne({_id: lastDay._id.toString()})
				.then(function (theLastDay) {
					expect(theLastDay.number).to.equal(2);
					return Day.findOne({_id: day._id.toString()});
				})
				.then(function (theFirstDay) {
					expect(theFirstDay.number).to.equal(1);
					done();
				})
				.then(null, function (error) {
					done(error);
				});
				
			});
	});










});