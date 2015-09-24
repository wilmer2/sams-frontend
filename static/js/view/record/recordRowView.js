var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'record/templates/recordRow.html',
  events: {
    'click .btn-show': 'redirectShow'
  },

  render: function () {
    this.model.dateFormat();

    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this))

    return this;
  },

  redirectShow: function () {
    var elderId = this.model.get('elder_id');
    var recordId = this.model.get('id');

    window.location.href = '#elder/' + elderId + '/record/' + recordId;
  }
})