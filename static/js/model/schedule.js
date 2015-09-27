var Backbone = require('backbone');
var _ = require('underscore');
var util = require('../util/util');
var utilHour = require('../util/utilHour');

module.exports = Backbone.Model.extend({
  formatDays: function () {
    var days = this.get('days');
    var daysFormat = util.selectDays(days);

    this.set('days', daysFormat, silentData);
  },

  hourStandar: function () {
    var data = this.toJSON();
    var times = _.pick(data, 'entry_time', 'departure_time');
    
    _.mapObject(times, function (val, key) {
      var newHour = utilHour.hourStandar(val);

      this.set(key, newHour , silentData);

    }.bind(this))

  }

});