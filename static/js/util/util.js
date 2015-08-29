var _      = require('underscore');
var toastr = require('../../dependencies/toastr/toastr');


Task = {
	showError: function (message) {
		if (_.isObject(message)) {
			message = this.multipleMessage(message);
		}
		
		toastr.error(message);
	},

	showSuccess: function (message) {
		toastr.success(message);
	},

	showInfo: function (message) {
		toastr.info(message);
	},

	multipleMessage: function (message) {
		var notify = _.map(message, function (value) {
				return value + '<br>';
		});

		return notify;
	},

	checkErr:function (err) {
		if (err.status == 401) {
			toastr.error('Acceso no autorizado');
		} else {
			this.interceptor(err);
		}
	},

	interceptor: function (err) {
		if (err.status == 403) {
			toastr.error('Error 403 acceso denegado');
		} else if (err.status >= 500) {
			toastr.error('Error 500 solictud no procesada');
		}
	},

	currentDate: function () {
		var date  = new Date();
		var year  = date.getFullYear();
		var month = date.getMonth() + 1;
		var day   = date.getDate();

		return year + '-' + month  + '-' + day;

	}
}

module.exports = Task;