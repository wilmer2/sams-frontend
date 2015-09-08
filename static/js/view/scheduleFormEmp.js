var Backbone   = require('backbone');
var $          = require('jquery');
var Handlebars = require('handlebars');
var util       = require('../util/util');

module.exports = Backbone.View.extend({
  template: Handlebars.compile($('#register-empSchedule').html()),
  events: {
    'submit #formEmp-schedule' : 'register',
    'click .Modal-itemConf' : 'addSchedule'
  },

  render: function () {
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);
    this.$modal = this.$el.find('.Modal');
    this.$form = this.$el.find('#formEmp-schedule');
  },

  addSchedule: function (e) {
    e.preventDefault();
    this.$modal.hide();
    this.$form.find('input[type="time"]').val('');

    $('input:checked').each(function () {
       $(this).attr({checked: false});
    })
  },

  register: function (e) {
    e.preventDefault();

    var data = this.$form.serialize();
    var id = this.model.get('id');

    $.post(Backend_url + 'register/employee/schedule/' + id, data)
     .done(function (res) {
      if (res.status == 'success') {
        util.showSuccess(res.message);
        this.$modal.show();
      } else {
          util.showError(res.message);
        }
      }.bind(this));
  },

  close: function () {
    this.remove();
  }

})