var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'citation/templates/citationNew.html',
  className: 'citationNewView',
  events: {
    'submit #citation-register': 'register'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this))
  },

  register: function (e) {
    e.preventDefault();

    var elderId = this.model.get('id');
    var data = $('#citation-register').serialize();
    var currentDate = util.currentDate();

    $.post(Backend_url + 'elder/' + elderId + '/citation', data)
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;
        var citationData = res.data;

        Backbone.Main.Elder.elder.clear();
        this.model.clear();
        this.model.set(citationData);

        var date = this.model.get('date_day');

        if (currentDate == date) {
          var infoMessage = 'Ha registrado cita para este dia';

          Backbone.Main.userLogin.addCitation();
          util.showSuccess(infoMessage);
        } else {
          util.showSuccess(successMessage);
        }

        var citationId = this.model.get('id');

        window.location.href = '#elder/' + elderId + '/citation/' + citationId;
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     }.bind(this))
  },

  close: function () {
    this.remove();
  }
})