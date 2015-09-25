var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
  template: 'employee/templates/employeeShow.html',

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);
      
      this.$el.html(html);

    }.bind(this))
  },

  close: function () {
    this.close();
  }
})