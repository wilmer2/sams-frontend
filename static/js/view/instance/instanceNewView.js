var Backbone = require('backbone');
var $ = require('jquery');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  events: {
    'submit #form-instance': 'register'
  },

  render: function () {
    $.get(rootView + 'instance/templates/instanceNew.html', function (html) {
      this.$el.html(html);
    }.bind(this))
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

        var elderId = this.model.get('id');

        window.location.href = '#elder/' + elderId + '/instance-waiting';
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