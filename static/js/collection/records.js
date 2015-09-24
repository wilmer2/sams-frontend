var Backbone = require('backbone');
var Record = require('../model/record');

module.exports = Backbone.Collection.extend({
  model: Record,

  parse: function (res) {
    if (res.status == 'success') {
      var recordData = res.data;

      return recordData;
    } else {
      var message = res.message;

      this.trigger('notRecord', message);
    }
  },

  updateUrl: function (url) {
    this.url = url;
  }
})