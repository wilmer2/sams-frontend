var Backbone = require('backbone');
var $        = require('jquery');
var util     = require('../util/util');

module.exports = Backbone.View.extend({
  template: $('#register-instance').html(),

  events: {
    'submit #form-instance' : 'register'
  },

  render: function () {
    this.$el.html(this.template);
  },

  register: function (e) {
    e.preventDefault();

    var data = $('#form-instance').serialize();

    $.post(Backend_url + 'register/notifications', data)
      .done(function (res) {
        if (res.status == 'success') {
          this.cleanForm();
          util.showSuccess(res.message);
        } else {
          util.showError(res.message);
        }
      }.bind(this))
  },

  cleanForm: function () {
    $('#form-instance').find('input').val('');
  }

});