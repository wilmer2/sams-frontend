var Backbone = require('backbone');
var $ = require('jquery');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: $('#register-action').html(),
  events : {
    'submit #form-action': 'register'
  },

  render: function () {
    this.$el.html(this.template);
  },

  register: function (e) {
    e.preventDefault();

    var data = $('#form-action').serialize();

    $.post(Backend_url + 'action', data)
     .done(function (res) {
      if (res.status == 'success') {
        this.model.set(res.data);

        var successMessage = res.message;
        var actionId = this.model.get('id');

        util.showSuccess(successMessage);
        Backbone.Main.navigate('action/' + actionId, triggerData);
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     }.bind(this))
  },

  close: function () {
    this.remove();
  }

});