var Backbone   = require('backbone');
var $          = require('jquery');
var Handlebars = require('handlebars');
var util       = require('../util/util');

module.exports = Backbone.View.extend({
  template: Handlebars.compile($('#schedule-editEmpView').html()),

  events: {
    'submit #form-editEmpSchedule' : 'edit'
  },

  render: function () {
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);
  },

  edit: function (e) {
    e.preventDefault();

    var data = $('#form-editEmpSchedule').serialize();
    var employeeId = this.model.get('employee_id');
    var scheduleId = this.model.get('id');

    $.post(Backend_url + 'schedule/' + scheduleId + '/employee/' + employeeId +'/remove', data)
     .done(function (res) {
        if (res.status == 'success') {
          util.showSuccess(res.message);
          window.location.replace('#employee/'+ employeeId);
        } else {
          util.showError(res.message)
        }
    })
  },

  close: function () {
    this.remove();
  }

})