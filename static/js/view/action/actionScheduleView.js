var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: Handlebars.compile($('#register-actionSchedule').html()),
  events: {
    'submit #form-actionSchedule': 'addHour'
  },

  render: function () {
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);
  },

  addHour: function (e) {
    e.preventDefault();

    var actionId = this.model.get('id');
    var data = $('#form-actionSchedule').serialize();

    $.post(Backend_url + 'action/' + actionId + '/schedule', data)
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        util.showSuccess(successMessage);
        Backbone.Main.navigate('action/' + actionId, triggerData);
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