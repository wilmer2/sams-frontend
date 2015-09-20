var Backbone     = require('backbone');
var $            = require('jquery');
var _            = require('underscore');
var ElderElement = require('./elderElementView');
var PaginateView = require('./paginationView');
var util         = require('../util/util');

module.exports = Backbone.View.extend({
	template: $('#elderTable-view').html(),

	events: {
		'click #sortByField a' : 'updateSortBy',
		'keyup #searchElder' : 'search',
	},

	initialize: function () {
		var collectionData = {collection: this.collection};
	  this.paginateView = new PaginateView(collectionData);

	  this.collection.on('goTo', this.changePage, this);
	},

	render: function () {
		this.$el.html(this.template);

		this.getPaginateView();

    this.$tbody = this.$el.find('table').children('tbody');

    this.addAll();
	},

	addAll: function () {
	  this.collection.forEach(this.addOne, this);
	},

	addOne: function (elder) {
		var element = new ElderElement({model: elder});

	  this.$tbody.append(element.render().el);
	},

	changePage: function () {
		this.emptyList();
    this.getPaginateView();
    this.addAll();
	},

	getPaginateView: function () {
		this.$el.prepend(this.paginateView.render().el);
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
		this.firstPage();
	},

	search: function (e) {
		var letters = $('#searchElder').val();
		var filter = this.collection.search(letters);

		if (_.isUndefined(filter)) {
			this.firstPage();
		} else {
			this.emptyList();
      this.getPaginateView();
      filter.forEach(this.addOne, this);
		}
	},

	firstPage: function () {
		this.collection.getFirstPage(fetchData)
		.done(function () {
			this.paginateView.pagInit();
			this.changePage();
		}.bind(this))
	},

	emptyList: function () {
    this.$tbody.empty()
  },

	close: function () {
		this.paginateView.close();
		this.remove();
	}


})
