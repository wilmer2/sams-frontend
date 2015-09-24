var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var PaginateView = require('../paginate/paginationView');
var ActionView = require('./actionRowView');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'action/templates/actionTable.html',
  boxError: Handlebars.compile($('#error-action').html()),
  events: {
    'keyup .Search': 'serch'
  },

  initialize: function () {
    var collectionData = {collection: this.collection};
    this.paginateView = new PaginateView(collectionData);

    this.collection.on('goTo', this.changePage, this);
    
    this.listenTo(this.collection, 'notAction', function (message) {
      this.message = message;
    });

  },

  render: function () {
    $.get(rootView + this.template, function (template) {
       if (_.isEmpty(this.message)) {
        var template = template;
        
        this.$el.html(template);
        this.getPaginateView();
        this.$tbody = this
                        .$el
                        .find('table')
                        .children('tbody');

        this.addAll();
      } else {
        this.emptyAction(this.message);
      }
    }.bind(this))

   
  },

  addAll: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (action) {
   var actionView = new ActionView({model: action});

    this.$tbody.append(actionView.render().el);
  },
  
  serch: function () {
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

  emptyList: function () {
    this.$tbody.empty()
  },

  emptyAction: function (message) {
    var erroMessage = {message: message};
    var boxError = this.boxError(erroMessage);

    this.$el.html(boxError);
  },

  close: function () {
    this.paginateView.close();
    this.remove();
  }

});