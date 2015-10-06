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

  isWaiting: function () {
    var state =  this.get('state');

    if (state == 'espera') {
      this.set('isWaiting', true);
    } else {
      this.set('isWaiting', false);
    }
  },

  dateFormat: function () {
    var data = this.toJSON();
    var dates = _.pick(data, 'date_start', 'date_end', 'date_cancel');

    _.mapObject(dates, function (val, key) {
      if (!_.isNull(val)) {
        var dateFormat = utilHour.dateFormat(val);

        this.set(key, dateFormat);
      }
    }.bind(this))

  },

  turnFormat: function () {
    var turn = this.get('turn');
 
    if (!_.isUndefined(turn)) {
      switch(turn) {
        case 'morning':
         turn = 'Mañana'
        break;
        case 'afternoon':
         turn = 'Tarde'
        break;
        case 'night':
         turn = 'Noche'
        break;
        case 'complete':
         turn = 'Todos los turnos'
        break;
      }

      this.set('turn', turn);
    }
  }
});