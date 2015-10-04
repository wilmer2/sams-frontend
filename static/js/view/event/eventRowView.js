var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'event/templates/eventRow.html',
  events: {
    'click #eventShow': 'redirectShow'
  },

  render: function () {
    this.model.dateFormat();
    
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);

    }.bind(this));

    return this;
  },

  redirectShow: function () {
    var eventId = this.model.get('id');

    Backbone.Main.navigate('event/' + eventId, triggerData);
  }

})