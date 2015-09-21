var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: Handlebars.compile($('#action-element').html()),
  events: {
    'click .btn-show': 'show'
  },

  render: function () {
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);

    return this;
  },

  show: function () {
    var actionId = this.model.get('id');

    Backbone.Main.navigate('action/' + actionId, triggerData);
  }
})