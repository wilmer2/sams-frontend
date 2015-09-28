var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');
var utilHour = require('../../util/utilHour');

module.exports = Backbone.View.extend({
  template: 'configuration/templates/configurationEdit.html',
  events: {
    'submit #configuration': 'edit'
  },

  initialize: function () {
    this.model.on('change', this.render, this);
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this))
  },

  edit: function (e) {
    e.preventDefault();
    
    var formData = new FormData($('#configuration')[0]);
    var url = 'config/edit?_method=PUT';
    var maxHour = $('#maxHour').val();
    maxHour = utilHour.hourFormat(maxHour);

    formData.append('max_hours', maxHour);

    $.ajax({
      url: Backend_url + url,
      type:'POST',
      data: formData,
      processData : false, 
      contentType : false,
    })
    .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;
        var configurationData = res.data;

        util.showSuccess(successMessage);
        this.model.set(configurationData);
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
})