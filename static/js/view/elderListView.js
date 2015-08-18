var Backbone     = require('backbone');
var $            = require('jquery');
var _            = require('underscore');
var ElderElement = require('./elderElementView');
var PaginateView = require('./paginationView');

var util = require('../util/util');

module.exports = Backbone.View.extend({
	template: $('#elderTable-view').html(),

	events: {
		'click #sortByField a' : 'updateSortBy',
		'keyup #searchElder' : 'search',
	},

	initialize: function () {
		 this.paginateView = new PaginateView({collection: this.collection});

		 this.listenTo(this.collection, 'reset', this.addAll, this);
		 this.listenTo(this.collection, 'goTo', this.changePage, this);
		 this.listenTo(this.collection, 'notData', function (message) {
		 	  this.notElder(message);
		 });

		 this.addTable();
	},

	addTable: function() {
		 this.$el.html(this.template);	
	},

	addAll: function () {
		 this.collection.forEach(this.addOne, this);
	},

	addOne: function (elder) {
		 var element = new ElderElement({model: elder});
		 this.$el.find('table').children('tbody').append(element.render().el);
	},

	changePage: function () {
		this.$el.find('table').children('tbody').empty();
		this.render();
	},

	updateSortBy: function (e) {
		e.preventDefault();
		var currentSort = $(e.target).attr('href');

		if (currentSort != 'active' && currentSort != 'deactivate') {
				 currentSort = 'active';
		}

		var state = this.collection.sortByState(currentSort);
		$('#sortByText').text(state);

		var url = Backend_url + 'elders/' + currentSort;
		
		this.collection.updateSort(url);
		this.collection.trigger('goTo');
		this.firstPage();
		
	},

	search: function (e) {
		var letters = $('#searchElder').val();
		var filter  = this.collection.search(letters);

		if (_.isUndefined(filter)) {
			this.changePage();
			this.firstPage();
		} else {
			this.changePage();
			filter.forEach(this.addOne, this);
		}
	},

	firstPage: function () {
		this.collection.getFirstPage({ fetch: true })
		 .done(function () {
				 this.paginateView.pagInit();
				 this.render();
			}.bind(this))
			.fail(function (err) {
				 this.checkErr(err);
			}.bind(util))
		},

	render: function () {
		this.$el.append(this.paginateView.render().el);
	},

	notElder: function (message) {
		util.showError(message);
	},

	close: function () {
		this.paginateView.close();
		this.remove();
	}


})
