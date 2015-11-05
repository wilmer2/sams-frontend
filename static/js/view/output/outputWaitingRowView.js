var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'output/templates/outputWaitingRow.html',
  events: {
    'click .outputWaitingShow': 'redirectShow',
    'click .outputWaitingConfirm': 'modalConfirm'
  },

  render: function () {
    this.model.dateFormat();
    
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);

    }.bind(this))

    return this;
  },

  redirectShow: function () {
    var elderId = this.model.get('elder_id');
    var outputId = this.model.get('id');

    window.location.href = '#elder/' + elderId + '/output/' + outputId;
  },

  modalConfirm: function () {
    var title = 'Confirmar Salida';
    var message = 'Esta seguro de confirmar salida';
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


  confirm: function () {
    var elderId = this.model.get('elder_id');
    var outputId = this.model.get('id');

    $.get(Backend_url + 'elder/' + elderId + '/output/' + outputId + '/confirmed')
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        this.model.trigger('check');
        Backbone.Main.userLogin.resOutput();
        util.showSuccess(successMessage);
        
        window.location.href = '#output/' + outputId + '/elder/' + elderId + '/confirm';
        
      }
     }.bind(this))
  }
})