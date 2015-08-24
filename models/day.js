// day.js

var mongoose = require('mongoose');

var DaySchema = new mongoose.Schema({
  number: Integer,
  hotel: {type: mongoose.Schema.Types.ObjectId, ref: 'Hotel'},
  restaurants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}],
  activities: [{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}]
});


module.exports = mongoose.model('Day', DaySchema);