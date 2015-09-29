var _  = require('underscore');
var toastr = require('toastr');

var Task = {
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

    if(month < 10){
      month = '0'+ month;
    }

    if (day < 10){
      day ='0'+ day
    }

		return year + '-' + month  + '-' + day;
	},

	extractMime: function (source) {
		var segment = source.split('/');
    var path = segment[1].split(';');
    var mime = path[0];

    return mime;
	},

	getFragmentId: function (fragment) {
		var segment = fragment.split('/');
		var id = segment[1];

		return id;
	},

	selectDays: function (days) {
		var days = days.split(' ');
		var slectDays = '';
    
		_.each(days, function (day) {
			  var day = this.extractDay(day);
			  if (_.isEmpty(slectDays)) {
			  	slectDays = day;
			  } else {
			  	slectDays = slectDays + ' ' + day;
			  }
		}.bind(this))

		return slectDays;
	},
  
  extractDay: function (day) {
  	var slectDay = '';
  	switch(day) {
  		case 'monday':
  		 slectDay = 'Lunes'
  		 break;
  		case 'tuesday':
  			slectDay = 'Martes'
  			break;
  		case 'wednesday':
  			slectDay = 'Miercoles'
  			break
  		case 'thursday':
  			slectDay = 'Jueves'
  			break
  		case 'friday':
  			slectDay = 'Viernes'
  			break
  		case 'saturday':
  			slectDay = 'Sabado'
  			break
  		case 'sunday':
  			slectDay = 'Domingo'
  			break
  	}

  	return slectDay;
  }

}

module.exports = Task;