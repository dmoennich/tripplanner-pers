'use strict';
/* global $ mapModule */

var daysModule = (function(){

  var exports = {},
      days = [{
        hotels:      [],
        restaurants: [],
        activities:  []
      }],
      currentDay = days[0];

  function addDay () {

    var dayNumber = days.length + 1;


    days_api.createNewDay(dayNumber, function (newDay) {
      days.push(newDay);
      //renderDayButtons();
      switchDay(days.length - 1);
    }, function (error) {console.log("ERROR creating page:", error);});

    // days.push({
    //   hotels: [],
    //   restaurants: [],
    //   activities: []
    // });
  }

  function switchDay (index) {
    var $title = $('#day-title');
    if (index >= days.length) index = days.length - 1;
    $title.children('span').remove();
    $title.prepend('<span>Day ' + (index + 1) + '</span>');
    currentDay = days[index];
    renderDay();
    renderDayButtons();
  }

  function removeCurrentDay () {
    if (days.length === 1) return;
    var index = days.indexOf(currentDay);
    var dayId = currentDay._id.toString();
    days_api.removeDay(dayId, function () {
      days.splice(index, 1);
      switchDay(index);
    }, function (error) {
      console.log("Error:", error);
    });
  }

  function renderDayButtons () {
    var $daySelect = $('#day-select');
    $daySelect.empty();
    days.forEach(function(day, i){
      $daySelect.append(daySelectHTML(day, i, day === currentDay));
    });
    $daySelect.append('<button class="btn btn-circle day-btn new-day-btn">+</button>');
  }

  function daySelectHTML (day, i, isCurrentDay) {
    return '<button class="btn btn-circle day-btn' + (isCurrentDay ? ' current-day' : '') + '">' + (i + 1) + '</button>';
  }

  exports.addAttraction = function(attraction) {
    if (currentDay[attraction.type].indexOf(attraction) !== -1) return;

    // remove current hotel
    if(attraction.type === "hotels" && currentDay.hotels.length > 0) {
      currentDay.hotels.pop();
    }

    days_api.addAttraction(attraction.type, currentDay._id, attraction._id, function () {
      currentDay[attraction.type].push(attraction);
      renderDay(currentDay);
      console.log("Attraction added");
    }, function (error) {
      console.log("Error occured adding attraction: ", error);
    });
  
  };

  exports.removeAttraction = function (attraction) {
    console.log("current day ", currentDay);
    console.log("currentday[attraction.type] ", currentDay[attraction.type]);

    currentDay[attraction.type].forEach(function(elem, index){
      if (elem._id = attraction._id){
        days_api.removeAttraction(attraction.type, currentDay._id, attraction._id, function() {
          currentDay[attraction.type].splice(index, 1);
          renderDay(currentDay);
          console.log("Attraction deleted");
        }, function(error) {
          console.log("Error occured removing attraction: ", error);
        });
        };
    });
  };

  function renderDay(day) {
    mapModule.eraseMarkers();
    day = day || currentDay;

    var attractions = ["hotels", "restaurants", "activities"];

    attractions.forEach(function(type){
      var $list = $('#itinerary ul[data-type="' + type + '"]');
      $list.empty();
      if (day[type]) {
        day[type].forEach(function(attraction){
          attraction.type = type;
          $list.append(itineraryHTML(attraction));
          mapModule.drawAttraction(attraction);
        });
      }
    });
  }

  function itineraryHTML (attraction) {
    return '<div class="itinerary-item><span class="title>' + attraction.name + '</span><button data-id="' + attraction._id + '" data-type="' + attraction.type + '" class="btn btn-xs btn-danger remove btn-circle">x</button></div>';
  }


  var initDays = function (daysFromDb) {

    if (daysFromDb.length === 0) {
      // create new day
      days_api.createNewDay(1, function (newDay) {
        days.push(newDay);
        currentDay = newDay;
      }, function (error) {console.log("ERROR creating page:", error);});
    } else {
      days = daysFromDb;
      currentDay = days[0];
    }
    renderDayButtons();
    renderDay(currentDay);
  };



  $(document).ready(function(){
    switchDay(0);
    $('.day-buttons').on('click', '.new-day-btn', addDay);
    $('.day-buttons').on('click', 'button:not(.new-day-btn)', function() {
      switchDay($(this).index());
    });
    $('#day-title').on('click', '.remove', removeCurrentDay);


    // load all days
    days_api.getAllDays(initDays, function (error) {
      console.log("ERROR:", error);
    });


  });

  return exports;

}());
