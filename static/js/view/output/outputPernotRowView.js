var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util')

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: Handlebars.compile($('#outputPernot-element').html()),
  events: {
    'click .Table-btnConfirm': 'confirm'
  },

  render: function () {
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);

    return this;
  }
})