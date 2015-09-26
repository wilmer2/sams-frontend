var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'user/templates/userShow.html',
  className: 'userShowView',
  events: {
    'submit #register-user': 'register',
    'click .btn-edit': 'redirectEdit'
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

    var employeeId = this.model.get('employee_id');
    var data = $('#register-user').serialize();

    $.post(Backend_url + 'employee/' + employeeId + '/user', data)
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        util.showSuccess(successMessage);
        window.location.replace('#employee/' + employeeId);
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     })

  },

  redirectEdit: function () {
    var employeeId = this.model.get('employee_id');

    window.location.href = '#employee/' + employeeId + '/user/edit'
  },

  close: function () {
    this.remove();
  }
})