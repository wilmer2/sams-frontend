var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util')

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'output/templates/outputPernotRow.html',
  events: {
    'click .btn-show': 'show'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    })
    
    return this;
  }
})