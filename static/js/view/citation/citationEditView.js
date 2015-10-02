var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');
var utilHour = require('../../util/utilHour');

module.exports = Backbone.View.extend({
  template: 'citation/templates/citationEdit.html',
  className: 'citationEditView',
  events: {
    'submit #formCitation-edit': 'edit'
  },

  render: function () {
    this.model.stateFormat();

    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);

    }.bind(this))
  },

  edit: function (e) {
    e.preventDefault();

    var elderId = this.model.get('elder_id');
    var citationId = this.model.get('id');
    var oldDate = this.model.get('date_day');
    var url = 'elder/' + elderId + '/citation/' + citationId + '/edit?_method=PUT';
    var formData = new FormData($('#formCitation-edit')[0]);
    var hour = $('input[type="time"]').val();
    hour = utilHour.hourFormat(hour);

    formData.append('hour', hour);

    $.ajax({
      url: Backend_url + url,
      type: 'POST',
      data: formData,
      processData : false, 
      contentType : false
    })
    .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;
        var newDataCitation = res.data;
        var currentDate = util.currentDate();

        this.model.set(newDataCitation);

        var newDate = this.model.get('date_day');

        if (newDate != oldDate) {
          if (newDate == currentDate) {
            Backbone.Main.userLogin.addCitation();
          } else {
            if (oldDate == currentDate) {
              var infoMessage = 'Ha cambiado fecha de cita por lo que no aparecerea en lista de citas de hoy';

              util.showInfo(infoMessage);
              Backbone.Main.userLogin.resCitation();
            }
          }
        }

        util.showSuccess(successMessage);

        window.location.replace('#elder/'+ elderId + '/citation/' + citationId);
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
    }.bind(this));


   
  },

  close: function () {
    this.remove();
  }
})