var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'instance/templates/instanceWaitingShow.html',
  className: 'instanceWaitingShowView',
  events: {
    'click .btn-edit': 'edit',
    'click .btn-cancel': 'cancel',
    'click .btn-config': 'confirm',
    'click .btn-delete': 'confirmDelete',
    'submit #instance-waitingEdit': 'submit'
  },

  initialize: function () {
    this.model.on('change', this.render, this);
  },

  render: function () {
    this.model.dateFormat();
    this.model.stateFormat();

    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);

      this.$submit = this.$el.find('.u-submit');
      this.$data = this.$el.find('.u-data');

    }.bind(this))
  },

  edit: function () {
    console.log('test');
    this.$submit.removeClass('u-disabled');
    this.$data.addClass('u-disabled');
  },

  cancel: function () {
    this.$submit.addClass('u-disabled');
    this.$data.removeClass('u-disabled');
  },

  confirm: function (e) {
    var target = $(e.target);
    var text = target.text();
    var state;

    if (text == 'Rechazar') {
      state = 'reject';
    } else {
      state = 'confirmed';
    }

    this.submitState(state);
  },

  confirmDelete: function () {
    var title = 'Eliminar Notificacion de Ingreso';
    var message = 'Esta seguro eliminar notificacion de ingreso';
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

  submit: function (e) {
    e.preventDefault();

    var data = $('#instance-waitingEdit').serialize();
    var elderId = this.model.get('elder_id');
    var instanceId = this.model.get('id');

    $.post(Backend_url + 'elder/' + elderId + '/instance/' + instanceId + '/edit?_method=PUT', data)
     .done(function (res) {
      if (res.status == 'success') {
        var instanceData = res.data;
        var successMessage = res.message;

        util.showSuccess(successMessage);
        this.model.set(instanceData);

      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     }.bind(this))
  },

  submitState: function (state) {
    var elderId = this.model.get('elder_id');
    var instanceId = this.model.get('id');
    var url = 'elder/' + elderId + '/instance/' + instanceId + '/confirmed?state=' + state;

    $.get(Backend_url + url)
     .done(function (res) {
       var message = res.message;

       util.showSuccess(message);
       this.clearElder()

       if (state == 'reject') {
        window.location.replace('#elder/' + elderId);
       } else {
        window.location.replace('#elder/' + elderId + '/edit');
       }

     }.bind(this))
  },

  clearElder: function () {
    Backbone.Main.Elder.elder.clear();
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
        this.clearElder();

        window.location.replace('#elder/' + elderId);
      }
     }.bind(this))
  },

  close: function () {
    this.remove();
  }
})