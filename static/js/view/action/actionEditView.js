var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'action/templates/actionEdit.html',
  events: {
    'submit #form-actionEdit': 'edit'
  },

  render: function () {
    $.get(rootView + this.template ,function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.el.html(html);
    }.bind(this))
  },

  edit: function (e) {
    e.preventDefault();

    var data = $('#form-actionEdit').serialize();
    var actionId = this.model.get('id');

    $.post(Backend_url + 'action/' + actionId + '/edit?_method=PUT', data)
     .done(function (res) {
      if (res.status == 'success') {
        this.model.set(res.data)

        var successMessage = res.message;
        var actionId = this.model.get('id');

        util.showSuccess(successMessage);
        window.location.replace('#action/' + actionId);
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