var Backbone = require('backbone');
var $        = require('jquery');
var alertify = require('alertifyjs');
var util     = require('../util/util');

module.exports = Backbone.View.extend({
  template: $('#register-permitSpecial').html(),
  events: {
    'submit #form-permitSpecial' : 'confirmed'
  },

  render: function () {
    this.$el.html(this.template);
  },

  confirmed: function (e) {
    e.preventDefault();

    var title = 'Registar Permiso';
    var message = 'Asegurese de que los datos son correctos porque no podran ser editados en el futuro';

    var callback = function () {
      this.register();
    }.bind(this);

    alertify.confirm(message, callback)
            .setting({
              'title': title,
              'labels': {
                  'ok' : 'Registar',
                  'cancel': 'Cancelar'
               }
            });

  },

  register: function () {
    var data = $('#form-permitSpecial').serialize();
    var employeeId = this.model.get('employee_id');

    $.post(Backend_url + 'permit/register/' + employeeId, data)
     .done(function (res) {
        if (res.status == 'success') {
          util.showSuccess(res.message);
          Backbone.Main.Employee.navigate('employee/' + employeeId, triggerData);
        } else {
          util.showError(res.message);
        }
     })
  },

  close: function () {
    this.remove();
  }
});