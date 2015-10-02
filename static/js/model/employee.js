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
    var date = this.get('date_birth');
    var dateFormat = this.get('date_format');

    if (_.isUndefined(dateFormat) && !_.isUndefined(date)) {
      dateFormat = utilHour.dateFormat(date);

      this.set('date_format', dateFormat);
    }
  }
});
