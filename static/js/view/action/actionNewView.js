var Backbone = require('backbone');
var $ = require('jquery');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: $('#register-action').html(),

  render: function () {
    this.$el.html(this.template);
  }

});