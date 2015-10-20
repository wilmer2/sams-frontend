var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'elder/templates/elderShow.html',
  className: 'elderShowView',
  events: {
    'click #elderEdit': 'redirectEdit',
    'click #elderDelete': 'confirmDelete',
    'click #elderConfirm': 'confirmState',
  },

  initialize: function (opt) {
    this.user = opt.user;
  },

  render: function () {
    this.model.dateFormat();
    this.model.civilStatus();

    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var elderData = this.model.toJSON();
      var userData = this.user.toJSON();
      var data = {
        elder: elderData,
        user: userData
      };
      var html = template(data);

      this.$el.html(html);

    }.bind(this))
  },

  redirectEdit: function () {
    var elderId = this.model.get('id');

    window.location.href = '#elder/' + elderId + '/edit';
  },

  confirmDelete: function () {
    var title = 'Eliminar Adulto Mayor';
    var message = 'Esta seguro de eliminar  este adulto mayor';
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

  confirmState: function () {
    var title = ' Estado de Adulto Mayor';
    var message = 'Esta seguro de cambiar estado de adulto mayor';
    var callback = function () {
      this.confirm();
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
    var elderId = this.model.get('id');

    $.post(Backend_url + 'elder/' + elderId + '/delete?_method=DELETE')
     .done(function (res) {
      if (res.status == 'success') {
        var deleteMessage = res.message;

        util.showSuccess(deleteMessage);
        window.location.replace('#elders');
      }
     })
  },

  confirm: function () {
    var elderId = this.model.get('id');
    var url = 'elder/' + elderId + '/confirmed';

    $.get(Backend_url + url)
     .done(function (res) {
      if (res.status == 'success') {
        var confirmedMessage = res.message;
        var elderData = res.data;

        this.model.set(elderData);
        util.showSuccess(confirmedMessage);
        this.render();
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