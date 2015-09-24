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
    var date = this.get('date');
    var oldDate = this.get('old_date');

    if (_.isUndefined(oldDate) && !_.isUndefined(date)) {
      var dateFormat = utilHour.dateFormat(date);

      this.set('date', dateFormat);
      this.set('old_date', date);
    }
  }
})