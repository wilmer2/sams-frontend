var Backbone = require('backbone');
var _ = require('underscore');
var utilHour = require('../util/utilHour');

module.exports = Backbone.Model.extend({
  initialize: function () {
    this.on('change', function (model) {
      model.set({notFound: false}, silentData);
    })
  },

  dateFormat: function () {
    var createdDate = this.get('created_at');
    var oldDate = this.get('old_date');

    if(_.isUndefined(oldDate)) {
      var segment = createdDate.split(' ');
      var dateFormat = utilHour.dateFormat(segment[0]);

      this.set('created_at', dateFormat);
      this.set('old_date', createdDate);
    }
  },

  showConfig: function () {
    var baston = this.get('baston');
    var segment = baston.split(' ');
    baston = segment[0] + ' Punto';

    var muleta = this.get('muleta');

    if (muleta == 'auxiliary') {
      muleta = 'Auxiliar';
    } else {
      muleta = 'Canadiense';
    }

    this.set('muleta', muleta);
    this.set('baston', baston);
  }

});