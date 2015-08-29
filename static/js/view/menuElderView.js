var Backbone   = require('backbone');
var $          = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
  el: $('#main-content'),
  template: Handlebars.compile($('#menu-elder').html()),

  render: function () {
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);
  }

});