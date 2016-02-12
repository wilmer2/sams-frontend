var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');
var utilHour = require('../../util/utilHour');

module.exports = Backbone.View.extend({
  template: 'citation/templates/citationShow.html',
  className: 'citationShowView',
  events: {
    'click .btn-edit': 'redirectEdit',
    'click .btn-delete': 'confirmDelete'
  },

  render: function () {
    this.model.dateFormat();
    this.model.stateFormat();
    this.model.hourStandar();

    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this))
  },

  redirectEdit: function () {
    var elderId = this.model.get('elder_id');
    var citationId = this.model.get('id');

    window.location.href = '#elder/' + elderId + '/citation/' + citationId + '/edit';
  },

  confirmDelete: function () {
    var title = 'Eliminar Cita';
    var message = 'Esta seguro de eliminar cita';
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
    var citationId = this.model.get('id');
    var state = this.model.get('state');
    var date = this.model.get('date_day');
    var confirmDate = this.confirmDate(date);
    var url = 'elder/' + elderId + '/citation/' + citationId + '/delete?_method=DELETE';

    $.post(Backend_url + url)
     .done(function (res) {
      if (res.status == 'success') {
        var deleteMessage = res.message;

        util.showSuccess(deleteMessage);

        if (confirmDate && state == 'En espera') {
          Backbone.Main.userLogin.resCitation();
        }

        Backbone.Main.Elder.elder.clear();
        window.location.href = '#elder/' + elderId;
      }
     })
  },

  confirmDate: function (date) {
    var currentDate = util.currentDate();
    currentDate = utilHour.dateFormat(currentDate);

    if (date == currentDate) {
      return true;
    } else {
      return false;
    }
  },

  close: function () {
    this.remove();
  }
})