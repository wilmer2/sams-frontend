var Backbone = require('backbone');
var Schedule = require('../model/schedule');

module.exports = Backbone.Collection.extend({
  model: Schedule,

  parse: function (res) {
    if (res.status == 'success') {
      var data = res.data;

      return data;
    } else {
      var message = res.message;

      this.trigger('notSchedule', message);
    }
  },
  
  updateUrl: function (url) {
    this.url = url;
  }
  
})