var Backbone   = require('backbone');
var $          = require('jquery');
var Handlebars = require('handlebars');


module.exports = Backbone.View.extend({
	template: Handlebars.compile($('#menuPaginate').html()),

	events: {
		'click a.page' :'goToPage',
		'click #nextPage': 'goToNext',
		'click #prevPage': 'goToPrev'
	},

	initialize: function () {
		 	this.pagInit();
	},

	render: function () {
		this.items   = this.collection.totalPage();

		var current = this.currentPage;
		var data    = JSON.stringify({items: this.items, current: current});
		var html    = this.template(JSON.parse(data));

		this.$el.html(html);
		return this;
	},


	goToPage: function (e) {
		e.preventDefault();

		console.log('go to page');
		var page  = $(e.target).text();
		var page  = parseInt(page);
		var total = this.items;

		if (page <= 0 || page > total  || isNaN(page)) {
			page = 1;
		}

		this.currentPage = page;
		this.collection.trigger('goTo');
		this.collection.getPage(page);
	},

	goToNext: function () {
		var total   = this.items;
		var current = this.currentPage;
		console.log('go to next')

		if (current < total) {
			this.currentPage = current + 1;
		}
		this.collection.trigger('goTo');
		this.collection.getNextPage();
	},

	goToPrev: function () {
		var current = this.currentPage;
    console.log('go to prev');
		if (current > 1) {
			this.currentPage = current - 1;
		}
		
		this.collection.trigger('goTo');
		this.collection.getPreviousPage();
	},

	pagInit: function () {
		this.currentPage = 1;
	},

	close: function () {
		this.remove();
	}


});