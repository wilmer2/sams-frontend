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
    this.$form = this.$el.find('#form-instance');
  },

  register: function (e) {
    e.preventDefault();

    var data = this.$form.serialize();

    $.post(Backend_url + 'instance/register', data)
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
    this.$form.find('input').val('');
  },

  close: function () {
    this.remove();
  }

});