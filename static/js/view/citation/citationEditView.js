var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');
var utilHour = require('../../util/utilHour');

module.exports = Backbone.View.extend({
  template: 'citation/templates/citationEdit.html',
  events: {
    'submit #formCitation-edit': 'edit'
  },

  render: function () {
    this.model.stateFormat();

    console.log(this.model.toJSON())

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

        util.showSuccess(successMessage);
        window.location.replace('#elder/'+ elderId + '/citation/' + citationId);
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
    });


   
  },

  close: function () {
    this.remove();
  }
})