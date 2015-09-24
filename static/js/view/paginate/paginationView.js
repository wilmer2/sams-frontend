var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');


module.exports = Backbone.View.extend({
	template: 'paginate/templates/pagination.html',

	events: {
		'click a.page' :'goToPage',
		'click #nextPage': 'goToNext',
		'click #prevPage': 'goToPrev'
	},

	initialize: function () {
		this.pagInit();
	},

	render: function () {
		$.get(rootView + this.template, function (template) {
			var template = Handlebars.compile(template);
			this.items = this.collection.totalPage();
			var current = this.currentPage;
			var data = JSON.stringify({items: this.items, current: current});
			var html = template(JSON.parse(data));

			this.$el.html(html);
		}.bind(this))
		
		return this;
	},

	goToPage: function (e) {
		e.preventDefault();
		
		var page = $(e.target).text();
		page = parseInt(page);
		var total = this.items;

		if (page <= 0 || page > total || isNaN(page)) {
			page = 1;
		}

		this.currentPage = page;

		this.collection.getPage(page);
		this.collection.trigger('goTo');
	},

	goToNext: function () {
		var total = this.items;
		var current = this.currentPage;

		if (current < total) {
			this.currentPage = current + 1;
		}

		this.collection.getNextPage();
		this.collection.trigger('goTo');
	},

	goToPrev: function () {
		var current = this.currentPage;

		if (current > 1) {
			this.currentPage = current - 1;
		}
		
		this.collection.getPreviousPage();
		this.collection.trigger('goTo');
	},

	pagInit: function () {
		this.currentPage = 1;
	},

	close: function () {
		this.remove();
	}


});