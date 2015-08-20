var Backbone      = require('backbone');
var $             = require('jquery');
var Handlebars    = require('handlebars');
var ActionElement = require('./actionElementView');

module.exports = Backbone.View.extend({
	template: Handlebars.compile($('#actionTable-view').html()),

	initialize: function () {
		this.listenTo(this.collection, 'reset', this.addAll, this);
	},

	addTable: function (title) {
		 var title = JSON.stringify({title: title});
	   var html  = this.template(JSON.parse(title));
	   this.$el.html(html);
	},

	addAll: function () {
		this.collection.forEach(this.addOne, this);
	},

	addOne: function (action) {
		var element = new ActionElement({model: action});
		this.$el.find('table').children('tbody').append(element.render().el);
	}

});