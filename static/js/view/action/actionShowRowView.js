var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'action/templates/actionShowRow.html',
  events: {
    'click .btn-remove': 'confirmRemove'
  },

  initialize: function (opt) {
    this.action = opt.action;
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this))

    return this;
  },

  confirmRemove: function () {
    var title = 'Eliminar horario de actividad';
    var message = 'Esta seguro de eliminar este horario';
    var callback = function () {
      this.removeHour();
    }.bind(this);

    alertify.confirm(message, callback)
    .setting({
      'title': title,
      'labels': {
        'ok': 'Confirmar',
        'cancel': 'Cancelar'
      }
    });
  },

  removeHour: function () {
    var actionId = this.action.get('id');
    var scheduleId = this.model.get('id');

    $.get(Backend_url + 'action/' + actionId + '/schedule/' + scheduleId + '/remove')
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        util.showSuccess(successMessage);
        this.close();
      }
     }.bind(this))
  },

  close: function () {
    this.model.trigger('destroy', this.model);
    this.remove();
  }
})