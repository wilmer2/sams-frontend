var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var Bloodhound = require('../../../../bower_components/typeahead.js/dist/bloodhound.js');
var typeahead = require('../../../../bower_components/typeahead.js/dist/typeahead.jquery');

module.exports = Backbone.View.extend({
  template: 'menu/templates/menuAdmin.html',

  render: function () {
    return new Promise(function (resolve, reject) {
      $.get(rootView + this.template, function (template) {
        var template = Handlebars.compile(template);
        var data = this.model.toJSON();
        var html = template(data);

        this.$el.html(html);
        this.initTypehead();

        resolve();
      }.bind(this))
    }.bind(this))
  },

  initTypehead: function () {
    //
  },

  close: function () {
    this.remove();
  }

})