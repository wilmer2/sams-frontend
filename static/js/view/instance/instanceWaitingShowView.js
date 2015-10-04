var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'instance/templates/instanceWaitingShow.html',
  className: 'instanceWaitingShowView',
  events: {
    'click #instanceBtn-edit': 'edit',
    'click #instanceBtn-cancel': 'cancel',
    'click .confirmInstance': 'confirm',
    'click #instance-waitingDelete': 'confirmDelete',
    'submit #instance-waitingEdit': 'submit'
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

    if (text == ' Rechazar') {
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
    var oldDate = this.model.get('old_date')
    var currentDate = util.currentDate();


    $.post(Backend_url + 'elder/' + elderId + '/instance/' + instanceId + '/edit?_method=PUT', data)
     .done(function (res) {
      if (res.status == 'success') {
        var instanceData = res.data;
        var successMessage = res.message;

       
        this.model.set(instanceData);

        var visitDate = this.model.get('visit_date');

        if (visitDate != oldDate) {
          if (visitDate == currentDate) {
            Backbone.Main.userLogin.addInstance()
          } else {
            if (oldDate <= currentDate) {

              Backbone.Main.userLogin.resInstance();
            }
          }
        }

        util.showSuccess(successMessage);

        this.render();

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
       if (res.status == 'success') {
        var stateMessage = res.message;

        Backbone.Main.userLogin.resInstance();
        util.showSuccess(stateMessage);
        this.clearElder()

        if (state == 'reject') {
          window.location.replace('#elder/' + elderId);
        } else {
          window.location.replace('#elder/' + elderId + '/edit');
        }
       } else {
         var stateError = res.message;

         util.showError(stateError);
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