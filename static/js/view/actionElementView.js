var Backbone   = require('backbone');
var $          = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
	tagName: 'tr',
	template: Handlebars.compile($('#actionElement-view').html()),

	initialize: function () {
		this.model.on('change', this.render, this);
	},

	render: function () {
		var data = this.model.toJSON();
		var html = this.template(data);

		this.$el.html(html);
		return this;
	},

});