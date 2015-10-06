var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  className: 'permitShowView',
  template: 'permit/templates/permitShow.html',
  events: {
    'click #permitShow-cancel': 'confirmedCancel'
  },

  render: function () {
    this.model.isWaiting();
    this.model.dateFormat();
    this.model.turnFormat();
    
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this))
  },

  confirmedCancel: function () {
    var title = 'Cancelar Permiso';
    var message = 'esta seguro de cancelar este permiso';
    var callback = function () {
      this.cancel();
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

  cancel: function () {
    var employeeId = this.model.get('employee_id');
    var permitId = this.model.get('id');
    var url = 'employee/' + employeeId + '/permit/' + permitId + '/cancel';

    $.get(Backend_url + url)
     .done(function (res) {
      if (res.status == 'success') {
        var cancelMessage = res.message;
        var data = res.data;

        util.showSuccess(cancelMessage);
        this.model.set(data);
        this.render();
      }
     }.bind(this))
  },

  close: function () {
    this.remove();
  }
})