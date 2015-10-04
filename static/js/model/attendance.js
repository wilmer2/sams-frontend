var Backbone = require('backbone');
var _ = require('underscore');
var utilHour = require('../util/utilHour');

module.exports = Backbone.Model.extend({

  hourStandar: function () {
    var data = this.toJSON();
    var times = _.pick(data, 'start_time', 'departure_time', 'hour_in', 'hour_out');
    var hours = _.pick(times, 'hour_in', 'hour_out');
    
    _.mapObject(times, function (val, key) {
      console.log(val);
      if (!_.isNull(val) && !_.isUndefined(val)) {
        var newHour = utilHour.hourStandar(val);

        this.set(key, newHour , silentData);
      }
    }.bind(this))

   _.mapObject(hours, function (val, key) {
     if (!_.isNull(val) && !_.isUndefined(val)) {
       if (key == 'hour_in') {
         this.set('check_in', val, silentData);
       } else {
         this.set('check_out', val, silentData);
       }
     }
   }.bind(this))

  },

  dateFormat: function () {
    var date = this.get('date_day');
    var dateFormat = utilHour.dateFormat(date);

    this.set('date_day', dateFormat);
  }

});