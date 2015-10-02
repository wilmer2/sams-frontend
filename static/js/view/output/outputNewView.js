var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'output/templates/outputNew.html',
  className: 'outputNewView',
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
        var outputData = res.data;

        util.showSuccess(successMessage);
        this.model.set(outputData);

        var outputId = this.model.get('id');

        window.location.href = '#elder/' + elderId + '/output/' + outputId;
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     }.bind(this))
  },

  close:function () {
    this.remove();
  }
})