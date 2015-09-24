var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
  template: 'menu/templates/menuElder.html',

  render: function () {
    return new Promise(function (resolve, reject) {
      $.get(rootView + this.template, function (template) {
        var template = Handlebars.compile(template);
        var data = this.model.toJSON();
        var html = template(data);

        this.$el.html(html);
        
        resolve();
      }.bind(this))
    }.bind(this));
  },

  close: function () {
    this.remove();
  }

});