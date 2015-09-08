var Backbone   = require('backbone');
var $          = require('jquery');

module.exports = Backbone.View.extend({
   el: $('#main-content'),
   template: $('#menu-adminView').html(),

   render: function () {
    this.$el.html(this.template);
   }
})