var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var PaginateView = require('../paginate/paginationView');
var OutputView = require('./outputRowView');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: $('#output-table').html(),
  boxError: Handlebars.compile($('#error-output').html()),
  events: {
    'keyup .Search': 'search'
  },

  initialize: function () {
    var collectionData = {collection: this.collection};
    this.paginateView = new PaginateView(collectionData);

    this.collection.on('goTo', this.changePage, this);
    this.collection.on('destroy', this.countOutput, this);
    
    this.listenTo(this.collection, 'notOutput', function (message) {
      this.message = message;
    });

    this.updateUrl();
  },
  
   render: function () {
    if (_.isEmpty(this.message)) {
      this.$el.html(this.template);
      this.getPaginateView();

      this.$tbody = this.$el.find('table').children('tbody');

      this.addAll();
    } else {
      this.emptyOutput(this.message);
    }
  },

  addAll: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (output) {
    var outputView = new OutputView({model: output});

    this.$tbody.append(outputView.render().el);
  },
  
  search: function () {
    var letters = $('.Search').val();
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

  changePage: function () {
    this.emptyList();
    this.getPaginateView();
    this.addAll();
  },

  getPaginateView: function () {
    this.$el.append(this.paginateView.render().el);
  },

  countOutput: function () {
    var countAssitance = this.collection.length;

    if (countAssitance == 0) {
      var message = 'No hay salidas en este momento';

      this.emptyOutput(message);
    }
  },

  updateUrl: function () {
    var url = Backend_url + 'outputs/normal';

    this.collection.updateUrl(url);
  },

  emptyList: function () {
    this.$tbody.empty()
  },

  emptyOutput: function (message) {
    var erroMessage = {message: message};
    var boxError = this.boxError(erroMessage);

    this.$el.html(boxError);
  },

  close: function () {
    this.paginateView.close();
    this.remove();
  }

});