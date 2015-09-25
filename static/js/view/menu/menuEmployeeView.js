var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var Bloodhound = require('../../../../bower_components/typeahead.js/dist/bloodhound.js');
var typeahead  = require('../../../../bower_components/typeahead.js/dist/typeahead.jquery');

module.exports = Backbone.View.extend({
  template: 'menu/templates/menuEmployee.html',
  className: 'appContent',

  render: function () {
    return new Promise(function (resolve, reject) {
      $.get(rootView + this.template, function (template) {
        var template = Handlebars.compile(template);
        var data = this.model.toJSON();
        var html = template(data);
        console.log(data);

        this.$el.html(html);

        resolve();
      }.bind(this))
    }.bind(this))
  },

  close: function () {
    this.close();
  }
})