var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'user/templates/userEdit.html',
  className: 'userEditView',
  events: {
    'submit #form-editUser': 'edit'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);

    }.bind(this))
  },

  edit: function (e) {
    e.preventDefault();

    var data = $('#form-editUser').serialize();
    var employeeId = this.model.get('employee_id');
    var userId = this.model.get('id');
    var url = 'employee/' + employeeId + '/user/' + userId +'/edit?_method=PUT';

    $.post(Backend_url + url, data)
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        util.showSuccess(successMessage);
        window.location.replace('#employee/' + employeeId + '/user')
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     })
  },

  close: function () {
    this.remove();
  }
})