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

  typeFormat: function () {
    var type = this.get('type');

    if (!_.isUndefined(type)) {
      if (type == 'pernot') {
        type = 'Pernocta';
      } else {
        type = 'Casual';
      }
    }

    this.set('type', type);
  },

  dateFormat: function () {
    var data = this.toJSON();
    var dates = _.pick(data,'date_start', 'date_end');

    _.mapObject(dates, function (val, key) {
      if (!_.isNull(val)) {
        var dateFormat = utilHour.dateFormat(val);

        this.set(key, dateFormat);
      }
    }.bind(this))
  }
});