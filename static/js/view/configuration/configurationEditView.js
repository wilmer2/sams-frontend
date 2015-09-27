var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

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
    
    var data = $('#configuration').serialize();
    var url = 'config/edit?_method=PUT';

    $.post(Backend_url + url, data)
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;
        var configData = res.data;

        util.showSuccess(successMessage);
        this.model.set(configData);
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