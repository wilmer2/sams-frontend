var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
  template: 'employee/templates/employeeShow.html',
  events: {
    'click .btn-edit': 'edit'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);
      
      this.$el.html(html);

    }.bind(this))
  },

  edit: function () {
    var employeeId = this.model.get('id');

    window.location.href = '#employee/' + employeeId + '/edit';
  },

  close: function () {
    this.remove();
  }
})