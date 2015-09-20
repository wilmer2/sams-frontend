var Backbone = require('backbone');
var Event = require('../model/event');
var util = require('../util/util');

module.exports = Backbone.Collection.extend({
  model:Event,

  parse: function (res) {
    if (res.status == 'success') {
      var data = res.data;

      return data;
    } else {
      var message = res.message;

      this.trigger('notEvent', message);
    }
  },

  updateUrl: function (url) {
    this.url = url;
  }

})