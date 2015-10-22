var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');


module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'employee/templates/employeeTableAssistanceRow.html',

  events: {
    'click .btn-show': 'redirectPermit'
  },

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
  },

  redirectPermit: function (e) {
    e.stopPropagation();
    
    var employeeId = this.model.get('employee_id');
    var permitId = this.model.get('permit_id');

    Backbone.Main.navigate('employee/' + employeeId + '/permit/' + permitId, triggerData);
  }
})