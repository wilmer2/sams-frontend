var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var Outputs = require('../../collection/outputs');
var OutputElders = require('./outputElderTableView');
var util = require('../../util/util');


module.exports = Backbone.View.extend({
  template: 'output/templates/outputWaitingShow.html',
  events: {
    'click #outputPendingDelete': 'confirmDelete',
    'click #outputPendingEdit': 'redirectEdit',
    'click #outputPendingConfirm': 'confirm'
  },

  render: function () {
    this.model.typeFormat();
    this.model.dateFormat();

    var outputs = new Outputs();
    var outputElders = new OutputElders({collection: outputs});
    var elderId = this.model.get('elder_id');
    var url = Backend_url + 'elder/' + elderId + '/outputs';

    outputs.updateUrl(url);

    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);

      outputs.getFirstPage(fetchData)
      .done(function () {
        outputElders.render();
        this.$el.append(outputElders.el);
      }.bind(this))

    }.bind(this))
  },

  redirectEdit: function () {
    var outputId = this.model.get('id');
    var elderId = this.model.get('elder_id');

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
        this.model.set(notFound, silentData);
        this.render();
      }
     }.bind(this))
  },

  confirm: function () {
    var elderId = this.model.get('elder_id');
    var outputId = this.model.get('id');

    $.get(Backend_url + 'elder/' + elderId + '/output/' + outputId + '/confirmed')
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        util.showSuccess(successMessage); 
        this.redirectEdit();
        
      }
     }.bind(this))
  },

  close: function () {
    this.remove();
  }
})