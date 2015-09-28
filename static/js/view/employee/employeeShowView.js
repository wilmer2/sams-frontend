var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'employee/templates/employeeShow.html',
  events: {
    'click #employeeBtn-edit': 'edit',
    'click #employeeBtn-delete': 'confirmedDelete'
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

  confirmedDelete: function () {
    var title = 'Eliminar Empleado';
    var message = 'Esta seguro de eliminar  este empleado';
    var callback = function () {
      this.delete();
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

  delete: function () {
    var employeeId = this.model.get('id');
    var url = 'employee/' + employeeId + '/delete?_method=DELETE';

    $.post(Backend_url + url)
     .done(function (res) {
      if (res.status == 'success') {
        var deleteMessage = res.message;

        util.showSuccess(deleteMessage);

        window.location.replace('#employees');
      }
     }.bind(this))
  },

  close: function () {
    this.remove();
  }
})