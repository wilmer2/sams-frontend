var Backbone = require('backbone');
var _ = require('underscore');
var utilHour = require('../util/utilHour');

module.exports = Backbone.Model.extend({
  initialize: function () {
    this.on('change', function (model) {
      model.set({notFound: false}, {silent: true});
    })
  },

  referenceFormat: function () {
    var referred = this.get('referred');
    var referredFormat = '';

    switch(referred) {
      case 'presidency_inass':
        referredFormat = 'Presidencia de INASS'
      break;
      case 'social_welfare':
        referredFormat = 'Gerencia de Bienestar Social '
      break;
      case 'health':
        referredFormat = 'Gerencia de Salud '
      break;
      case 'cssr':
        referredFormat = 'Director del C.S.S.R';
      break;
      default:
        referredFormat = 'otros';
    }

    if (!_.isUndefined(referred)) {
      this.set('referredFormat', referredFormat);
    }

  },

  dateFormat: function () {
    var date = this.get('visit_date');

    if (!_.isUndefined(date)) {
      var letter = _.indexOf(date, '/');
     
      letter = date[letter];

      if (_.isUndefined(letter)) {
        var dateFormat = utilHour.dateFormat(date);

        this.set('visit_date', dateFormat, silentData);
        this.set('old_date', date, silentData);
      }
    }
  },

  stateFormat: function () {
    var state = this.get('state');
    var stateFormat = '';

    switch(state) {
      case 'waiting':
        stateFormat = 'En espera'
      break;
      case 'reject':
        stateFormat = 'Rechazada'
      break;
      case 'confirmed':
        stateFormat = 'Confirmada'
      break;
    }

    if (!_.isUndefined(state)) {
      this.set('state', stateFormat, silentData);
      this.set('old_state', state, silentData);
    }

  }
});