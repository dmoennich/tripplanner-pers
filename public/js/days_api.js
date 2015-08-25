
var days_api = (function () {

	var exports = {};

	exports.getAllDays = function (callback, errorHandler) {
		$.ajax({
			method: "GET",
			url: "/api/days/alldays",
			success: callback,
			error: errorHandler
		});
	};

	exports.addAttraction = function (attractionType, dayId, attractionId, callback, errorHandler) {
		$.ajax({
			method: "POST",
			url: "/api/days/" + dayId + "/" + attractionType + "/" + attractionId,
			success: callback,
			error: errorHandler
		});
	};

	exports.createNewDay = function (dayNumber, callback, errorHandler) {
		$.ajax({
			method: "POST",
			url: "/api/days/newday",
			data: {number: dayNumber},
			success: callback,
			error: errorHandler
		});
	};


	exports.removeDay = function (dayId, callback, errorHandler) {
		$.ajax({
			method: "DELETE",
			url: "/api/days/" + dayId,
			success: callback,
			error: errorHandler
		});
	};

	return exports;

})();