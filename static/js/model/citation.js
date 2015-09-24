var Backbone = require('backbone');
var _ = require('underscore');
var utilHour = require('../util/utilHour');


module.exports = Backbone.Model.extend({
  initialize: function () {
    this.on('change', function (model) {
      var notFoundFalse = {notFound: false};
      
      model.set(notFoundFalse, silentData);
    })
  },

  dateFormat: function () {
    var date = this.get('date_day');
    var oldDate = this.get('old_date');

    if (_.isUndefined(oldDate) && !_.isUndefined(date)) {
      var dateFormat = utilHour.dateFormat(date);

      this.set('date_day', dateFormat);
      this.set('old_date', date);
    }
  },

  stateFormat: function () {
    var state = this.get('state');
    var stateFormat = '';

    switch(state) {
      case 'loading':
        stateFormat = 'En espera';
        this.set({waiting: true}, silentData);
      break;
      case 'reject':
        stateFormat = 'Cancelada';
      break;
      case 'confirmed':
        stateFormat = 'Confirmada';
      break;
    }

    if (!_.isUndefined(state)) {
      this.set('state', stateFormat);
    }
  },

  hourStandar: function () {
    var hour = this.get('hour');

    if (!_.isUndefined(hour)) {
      hour = utilHour.hourStandar(hour);

      this.set('hour', hour);
    }
  }
});