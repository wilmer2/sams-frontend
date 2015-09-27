var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'permit/templates/permitExtendNew.html',
  className: 'permitExtendNewView',
  events: {
    'submit #form-permitExtend': 'confirmedRegister'
  },

  initialize: function (opt) {
    this.employee = opt.employee;
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.employee.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this))
  },

  confirmedRegister: function (e) {
    e.preventDefault();

    var title = 'Registrar Permiso extendido';
    var message = 'Asegurese de que los datos son correctos porque no podran ser editados en el futuro';
    var callback = function () {
      this.register();
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

  register: function () {
    var employeeId = this.employee.get('id');
    var data = $('#form-permitExtend').serialize();
    var url = 'employee/' + employeeId + '/permit';

    $.post(Backend_url + url, data)
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;
        var permitData = res.data;

        this.model.set(permitData);
        util.showSuccess(successMessage);

        var permitId = this.model.get('id');
        window.location.href = '#employee/' + employeeId + '/permit/' + permitId;
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     }.bind(this))
  },

  close: function () {
    this.remove();
  }
})