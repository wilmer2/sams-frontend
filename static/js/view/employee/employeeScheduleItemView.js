var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'employee/templates/employeeScheduleItem.html',
  events: {
    'click #employeeSchedule-btn': 'confirmRemove'
  },

  initialize: function (opt) {
    this.employee = opt.employee;
  },

  render: function () {
    this.model.formatDays();
    this.model.hourStandar();
    
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);

    }.bind(this))

    return this;
  },

  confirmRemove: function () {
    var title = 'Eliminar Horario de Empleado';
    var message = 'esta seguro de eliminar este horario';
    var callback = function () {
      this.removeHour();
    }.bind(this);

    alertify.confirm(message, callback)
    .setting({
      'title': title,
      'labels': {
        'ok': 'Confirmar',
        'cancel': 'Cancelar'
      }
    });
  },

  removeHour: function () {
    var employeeId = this.employee.get('id');
    var scheduleId = this.model.get('id');
    var url = 'employee/' + employeeId + '/schedule/' + scheduleId + '/remove';

    $.get(Backend_url + url)
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        util.showSuccess(successMessage);
        this.close();
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     }.bind(this))
  },

  close: function () {
    this.model.trigger('destroy', this.model);
    this.remove();
  }
});