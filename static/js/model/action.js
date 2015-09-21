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
    var data = this.toJSON();
    var times = _.pick(data, 'hour_in', 'hour_out');
    
    _.mapObject(times, function (val, key) {
      if (!_.isNull(val)) {
        var newHour = utilHour.hourStandar(val);

        this.set(key, newHour);
      }
    }.bind(this))

  }
});