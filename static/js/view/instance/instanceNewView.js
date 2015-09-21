var Backbone = require('backbone');
var $ = require('jquery');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: $('#register-instance').html(),
  events: {
    'submit #form-instance': 'register'
  },

  render: function () {
    console.log('render');
    this.$el.html(this.template);
  },

  register: function (e) {
    e.preventDefault();

    var data = $('#form-instance').serialize();

    $.post(Backend_url + 'elder/instance', data)
     .done(function (res) {
      if (res.status == 'success') {
        var data = res.data;
        var successMessage = res.message;

        this.model.set(data);
        util.showSuccess(successMessage);

        var elderId = this.get('id');

        window.location.href = '#elder/' + elderId;
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