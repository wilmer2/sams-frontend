var Backbone = require('backbone');
var Citation = require('../model/citation');

module.exports = Backbone.Collection.extend({
  model: Citation,

  parse: function (res) {
    if (res.status == 'success') {
      var data = res.data;

      return data;
    } else {
      var message = res.message;

      this.trigger('notCitation', message);
    }
  },

  updateUrl: function (url) {
    this.url = url;
  }
})