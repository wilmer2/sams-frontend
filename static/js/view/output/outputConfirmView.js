var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: Handlebars.compile($('#register-outputConfirm').html()),
  events: {
    'submit #form-outputConfirm': 'additionalInfo',
    'click .btn-cancel': 'redirect'
  },

  render: function () {
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);
  },

  additionalInfo: function (e) {
    e.preventDefault();

    var outputId = this.model.get('id');
    var elderId = this.model.get('elder_id');
    var data = $('#form-outputConfirm').serialize();
    
    'elder/{elderId}/output/{outputId}/edit'

    $.post(Backend_url + 'elder/' + elderId + '/output/' + outputId + '/edit?_method=PUT', data)
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        util.showSuccess(successMessage);
        this.redirect();
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     }.bind(this))
  },

  redirect: function () {
    var type = this.model.get('type');

    if (type == 'pernot') {
      window.location.replace('#output/waiting');
    } else {
      window.location.replace('#output/');
    }

  },

  close: function () {
    this.remove();
  }
});