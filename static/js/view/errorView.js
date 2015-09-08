var Backbone   = require('backbone');
var $          = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
  template: Handlebars.compile($('#error-view').html()),

  addMessage: function (message) {
    var message  = {message: message};
    this.message = message;
  },

  render: function () {
    this.$el.html(this.template(this.message));
  },

  close: function () {
    this.remove();
  }

  
})