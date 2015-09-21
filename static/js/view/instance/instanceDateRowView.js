var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: Handlebars.compile($('#instanceDate-element').html()),
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
    var elderId = this.model.get('elder_id');
    var instanceId = this.model.get('id');

    window.location.href = '#elder/' + elderId + '/instance/' + instanceId;
  }

})