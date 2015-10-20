var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'output/templates/outputConfirm.html',
  events: {
    'submit #output-confirm': 'confirm',
    'click #outputConfirmCancel': 'redirect'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this))
  },

  confirm: function (e) {
    e.preventDefault();

    var elderId = this.model.get('elder_id');
    var outputId = this.model.get('id');
    var url = 'elder/' + elderId + '/output/' + outputId + '/edit?_method=PUT';
    var info = $('#outputInfo').val();

    this.model.set('info', info);

    var data = this.model.toJSON();

    $.post(Backend_url + url, data)
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        util.showSuccess(successMessage);
        this.redirect();

      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     }.bind(this))
  },

  redirect: function () {
    var type = this.model.get('type');
    
    if (type == 'normal') {
      window.location.replace('#output/');
    } else {
      window.location.replace('#output/waiting');
    }
  },

  close: function () {
    this.remove();
  }


});