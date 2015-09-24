var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'action/templates/actionRow.html',
  events: {
    'click .btn-show': 'show'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this))

    return this;
  },

  show: function () {
    var actionId = this.model.get('id');

    Backbone.Main.navigate('action/' + actionId, triggerData);
  }
})