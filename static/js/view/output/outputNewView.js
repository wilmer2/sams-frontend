var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'output/templates/outputNew.html',
  events: {
    'submit #output-register': 'register'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this));
  },

  register: function (e) {
    e.preventDefault();

    var elderId = this.model.get('id');
    var data = $('#output-register').serialize();

    $.post(Backend_url + 'elder/' + elderId + '/output', data)
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        util.showSuccess(successMessage);

        window.location.href = '#elder/' + elderId;
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     })
  },

  close:function () {
    this.remove();
  }
})