var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: Handlebars.compile($('#actionHour-element').html()),
  events: {
    'click .btn-remove': 'removeHour'
  },

  initialize: function (opt) {
    this.action = opt.action;
  },

  render: function () {
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);

    return this;
  },

  removeHour: function () {
    var actionId = this.action.get('id');
    var scheduleId = this.model.get('id');

    $.get(Backend_url + 'action/' + actionId + '/schedule/' + scheduleId + '/remove')
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        util.showSuccess(successMessage);
        this.close();
      }
     }.bind(this))
  },

  close: function () {
    this.model.trigger('destroy', this.model);
    this.remove();
  }
})