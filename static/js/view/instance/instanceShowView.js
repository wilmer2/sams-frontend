var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'instance/templates/instanceShow.html',
  events: {
    'click .btn-edit': 'redirectEdit',
    'click .btn-delete': 'confirmDelete'
  },

  render: function () {
    this.model.referenceFormat();
    this.model.dateFormat();
    this.model.stateFormat();

    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this))
  },

  confirmDelete: function () {
    var title = 'Eliminar Notificacion de Ingreso';
    var message = 'Esta seguro de eliminar notificacion';
    var callback = function () {
      this.delete();
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

  redirectEdit: function () {
    var instanceId = this.model.get('id');
    var elderId = this.model.get('elder_id');
    
    window.location.href = '#elder/' + elderId + '/instance/' + instanceId + '/edit';
  },

  delete: function () {
    var elderId = this.model.get('elder_id');
    var instanceId = this.model.get('id');
    var url = 'elder/' + elderId + '/instance/' + instanceId + '/delete?_method=DELETE';

    $.post(Backend_url + url)
     .done(function (res) {
      if (res.status == 'success') {
        var deleteMessage = res.message;

        util.showSuccess(deleteMessage);
        window.location.replace('#elder/' + elderId);
      }
     })
  },

  close: function () {
    this.remove();
  }

});