var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'permit/templates/permitTableRow.html',
  events: {
    'click #btn-permitShow': 'redirectShow',
    'click #btn-permitDelete': 'confirmedDelete'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this));

    return this;
  },

  redirectShow: function () {
    var employeeId = this.model.get('employee_id');
    var permitId = this.model.get('id');

    window.location.href = '#employee/' + employeeId +'/permit/' + permitId;
  },

  confirmedDelete: function () {
    var title = 'Eliminar Permiso';
    var message = 'esta seguro de eliminar este permiso';
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
    var employeeId = this.model.get('employee_id');
   console.log(employeeId);
    var permitId = this.model.get('id');
    var url = 'employee/' + employeeId + '/permit/' + permitId + '/delete?_method=DELETE';
 
    $.post(Backend_url + url)
     .done(function (res) {
      if (res.status == 'success') {
        var errorMessage = res.message;

        util.showError(errorMessage);
        this.close();
      }
     }.bind(this))
  },

  close: function () {
    this.model.trigger('destroy', this.model);
    this.remove();
  }

})