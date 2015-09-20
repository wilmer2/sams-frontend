var Backbone = require('backbone');
var $ = require('jquery');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: $('#register-product').html(),

  events: {
    'submit #form-product': 'register'
  },

  render: function () {
    this.$el.html(this.template);

    this.$form = this.$el.find('#form-product');
    this.$select = this.$el.find('.Select');
  },

  register: function (e) {
    e.preventDefault();

    var data = this.$form.serialize();

    $.post(Backend_url + 'product', data)
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        util.showSuccess(successMessage);
        this.cleanForm();
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     }.bind(this))
  },

  cleanForm: function () {
    this.$form.find('input').val('');
    this.$select.children('option[value="kg"]').attr('selected', 'selected');
  },

  close: function () {
    this.remove();
  }

});