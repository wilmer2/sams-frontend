var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var PaginateView = require('../paginate/paginationView');
var CitationView = require('./citationElderRowView');
var util = require('../../util/util');


module.exports = Backbone.View.extend({
  template: 'citation/templates/citationElderTable.html',
  className: 'citationElderTableView',
  boxError: $('#error-citation').html(),

  initialize: function () {
    var collectionData = {collection: this.collection};
    this.paginateView = new PaginateView(collectionData);

    this.collection.on('goTo', this.changePage, this);
    this.listenTo(this.collection,'notCitation', function (message) {
      this.message = message;
    });

  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      if (_.isEmpty(this.message)) {
        var template = template;

        this.$el.html(template);
        this.getPaginateView();

        this.$tbody = this.$el
                          .find('table')
                          .children('tbody');

        this.addAll();
      } else {
        this.emptyCitation(this.message);
      }
    }.bind(this))
  },

  addAll: function () {
     this.collection
         .forEach(this.addOne, this);
  },

  addOne: function (citation) {
    var citationView = new CitationView({model:citation});

    this.$tbody
        .append(citationView.render().el);
  },

  firstPage: function () {
    this.collection
        .getFirstPage(fetchData)
        .done(function () {
          this.paginateView
              .pagInit();
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

  emptyList: function () {
    this.$tbody.empty()
  },

  emptyCitation: function (message) {
    var erroMessage = {message: message};
    var boxError = this.boxError(erroMessage);

    this.$el.html(boxError);
  },

  close: function () {
    this.paginateView
        .close();
    this.remove();
  }

})


