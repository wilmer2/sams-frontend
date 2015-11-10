var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'record/templates/recordShow.html',
  events: {
    'click #recordEdit': 'redirectEdit',
    'click #recordDelete': 'confirmDelete'
  },

  render: function () {
    this.model.showConfig();
    
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this));
  },

  redirectEdit: function () {
    var elderId = this.model.get('elder_id');
    var recordId = this.model.get('id');

    window.location.href = '#elder/' + elderId + '/record/' + recordId + '/edit';
  },

  confirmDelete: function () {
    var title = 'Eliminar Historia Clinica';
    var message = 'Esta seguro de eliminar historia clinica';
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
    var recordId = this.model.get('id');
    var url = 'elder/' + elderId + '/record/' + recordId + '/delete?_method=DELETE';

    $.post(Backend_url + url)
     .done(function (res) {
      if (res.status == 'success') {
        var deleteMessage = res.message;

        Backbone.Main.Elder.elder.clear();
        util.showSuccess(deleteMessage);
        window.location.replace('#elder/' + elderId);
      }
     })
  },

  close: function () {
    this.remove();
  }
})