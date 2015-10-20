var Backbone = require('backbone');
var $ = require('jquery');

module.exports = Backbone.View.extend({
  template: 'notFound/templates/notFoundContent.html',

  render: function () {
    return new Promise(function (resolve, reject) {
      $.get(rootView +  this.template, function (template) {
        var template = template;

        this.$el.html(template);

        resolve();
      }.bind(this))
    }.bind(this))
  },

  close: function () {
    this.remove();
  }

})