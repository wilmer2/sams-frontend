var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'instance/templates/instanceDateRow.html',
  events: {
    'click .instanceDateShow': 'redirectShow'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this));

    return this;

  },

  redirectShow: function () {
    var elderId = this.model.get('elder_id');
    var instanceId = this.model.get('id');
    var state = this.model.get('old_state');

    if (state == 'waiting') {
      window.location.href = '#elder/' + elderId + '/instance-waiting';
    } else {
      window.location.href = '#elder/' + elderId + '/instance/' + instanceId;
    }

  }

})