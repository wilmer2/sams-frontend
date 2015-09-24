var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'output/templates/outputShow.html',
  events: {
    'click .btn-edit': 'redirectEdit',
    'click .btn-delete': 'confirmDelete'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);

    }.bind(this))
  },

  redirectEdit: function () {
    var elderId = this.model.get('elder_id');
    var outputId = this.model.get('id');

    window.location.href = '#elder/' + elderId + '/output/' + outputId + '/edit';
  },

  confirmDelete: function () {
    var title = 'Eliminar Salida';
    var message = 'Esta seguro de eliminar salida';
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
    var elderId = this.model.get('elder_id');
    var outputId = this.model.get('id');
    var url = 'elder/' + elderId + '/output/' + outputId + '/delete?_method=DELETE';

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