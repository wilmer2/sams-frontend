var Backbone = require('backbone');
var $ = require('jquery');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'action/templates/actionNew.html',
  events : {
    'submit #form-action': 'register'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = template;

      this.$el.html(template);
    }.bind(this))
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