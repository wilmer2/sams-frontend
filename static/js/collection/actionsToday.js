var Backbone = require('backbone');
var Action = require('../model/action');

module.exports = Backbone.Collection.extend({
  model: Action,
  url: 'http://localhost/actions/today',
  
  parse: function (res) {
    if (res.status == 'success') {
      var data = res.data;

      return data;
    } else {
      var message = res.message;

      this.trigger('notAction', message);
    }
  }
});