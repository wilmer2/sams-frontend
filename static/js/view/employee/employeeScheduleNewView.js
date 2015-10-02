var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'employee/templates/employeeSchedule.html',
  events: {
    'submit #formEmp-schedule' : 'register',
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);

    }.bind(this))
  },

  register: function (e) {
    e.preventDefault();

    var data = $('#formEmp-schedule').serialize();
    var employeeId = this.model.get('id');

    $.post(Backend_url + 'employee/' + employeeId + '/schedule', data)
     .done(function (res) {
      if (res.status == 'success') {
        util.showSuccess(res.message);
        
        window.location.href = '#employee/' + employeeId + '/schedule/list';
      } else {
          util.showError(res.message);
        }
      }.bind(this));
  },

  close: function () {
    this.remove();
  }

})