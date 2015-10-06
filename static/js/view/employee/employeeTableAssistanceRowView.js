var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');


module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'employee/templates/employeeTableAssistanceRow.html',

  render: function () {
    this.model.hourStandar();
    this.model.dateFormat();
    
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this))

    return this;
  }
})