var Backbone = require('backbone');
var $        = require('jquery');

module.exports = Backbone.View.extend({
	template: $('#menu-view').html(),

	render: function () {
		this.$el.html(this.template);
	},

	close: function () {
		this.remove();
	}

});