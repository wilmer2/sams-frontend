var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'event/templates/eventShow.html',
  events: {
    'click .btn-edit': 'redirectEdit',
    'click .btn-delete': 'confirm'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);

      this.model.hourStandar();

      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this))

  },
  
  redirectEdit: function () {
    var eventId = this.model.get('id');

    Backbone.Main.navigate('event/' + eventId + '/edit', triggerData);
  },

  confirm: function () {
    var title = 'Eliminar evento';
    var message = 'Esta seguro de eliminar este evento';
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

  delete: function () {
    var eventId = this.model.get('id');

    $.post(Backend_url + 'occasion/' + eventId + '/delete?_method=DELETE')
     .done(function(res) {
      if (res.status == 'success') {
        var deleteMessage = res.message;

        util.showSuccess(deleteMessage);
        window.location.replace('#event/list');
      }
     })
  },
  
  close: function () {
    this.remove();
  }
})