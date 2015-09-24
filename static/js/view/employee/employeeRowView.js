var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'employee/templates/employeeRow.html',
  events: {
    'click .btn-show': 'redirectShow'
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

  redirectShow: function () {
    var employeeId = this.model.get('id');

    window.location.href = '#employee/' + employeeId;
  }

})