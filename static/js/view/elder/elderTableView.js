var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var PaginateView = require('../paginate/paginationView');
var ElderView = require('./elderRowView');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
	template: 'elder/templates/elderTable.html',
	boxError: Handlebars.compile($('#error-elder').html()),

	events: {
		'keyup .Search': 'search',
	},

	initialize: function () {
		var collectionData = {collection: this.collection};
    this.paginateView = new PaginateView(collectionData);

    this.collection.on('goTo', this.changePage, this);
    
    this.listenTo(this.collection, 'notElder', function (message) {
      this.message = message;
    });

    this.updateUrl();
	},

	render: function () {
    $.get(rootView + this.template, function (template) {
      if (_.isEmpty(this.message)) {
        var template = template;

        this.$el.html(template);
        this.getPaginateView();

        this.$tbody = this.$el.find('table').children('tbody');

        this.addAll();
      } else {
        this.emptyElder(this.message);
      }
    }.bind(this))
	},

	addAll: function () {
		this.message = '';

	  this.collection.forEach(this.addOne, this);
	},

	addOne: function (elder) {
		var elderView = new ElderView({model: elder});

	  this.$tbody.append(elderView.render().el);
	},

	changePage: function () {
		this.emptyList();
    this.getPaginateView();
    this.addAll();
	},

	getPaginateView: function () {
		this.$el.prepend(this.paginateView.render().el);
	},

	updateUrl: function (e) {
		var url = Backend_url + 'elders/' + 'active';
		
		this.collection.updateUrl(url);
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

  emptyElder: function (message) {
  	var errorMessage = {message: message};
  	var boxError = this.boxError(errorMessage);

  	this.$el.html(boxError);
  },

	close: function () {
		this.paginateView.close();
		this.remove();
	}


})
