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

  hourStandar: function () {
    var data = this.convertData();
    var times = _.pick(data, 'entry_time', 'departure_time');
    
    _.mapObject(times, function (val, key) {
      if (!_.isNull(val)) {
        var newHour = utilHour.hourStandar(val);

        this.set(key, newHour);
      }
    }.bind(this))
  },

  dateFormat: function () {
    var allData = this.convertData();
    var dates = _.pick(allData, 'date_start', 'date_end');

    _.mapObject(dates, function (val, key) {
      if (!_.isNull(val)) {
        var dateFormat = utilHour.dateFormat(val);

        this.set(key, dateFormat);
      }
    }.bind(this))
  },

  convertData: function () {
    return this.toJSON();
  }
});