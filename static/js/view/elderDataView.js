var Backbone   = require('backbone');
var $          = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
  template: Handlebars.compile($('#elder-data').html()),

  render: function () {
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);
  },

  close: function () {
    this.remove();
  }

});