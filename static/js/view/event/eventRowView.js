var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: Handlebars.compile($('#event-element').html()),
  events: {
    'click .btn-info': 'redirectShow'
  },

  render: function () {
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);

    return this;
  },

  redirectShow: function () {
    var eventId = this.model.get('id');

    Backbone.Main.navigate('event/' + eventId, triggerData);
  }

})