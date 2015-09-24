var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'instance/templates/instanceElderRow.html',
  events: {
    'click .btn-show': 'redirectShow'
  },

  render: function () {
    this.model.referenceFormat();
    this.model.dateFormat();
    this.model.stateFormat();

    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this));

    return this;
  },

  redirectShow: function () {
    var state = this.model.get('old_state');
    var instanceId = this.model.get('id');
    var elderId = this.model.get('elder_id');

    if (state == 'waiting') {
      window.location.href = '#elder/' + elderId + '/instance-waiting';
    } else {
      window.location.href = '#elder/' + elderId + '/instance/' + instanceId;
    }
  }


})