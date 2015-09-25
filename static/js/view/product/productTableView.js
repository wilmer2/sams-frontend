var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var PaginateView = require('../paginate/paginationView');
var ProductView = require('./productRowView');

module.exports = Backbone.View.extend({
  template: 'product/templates/productTable.html',
  boxError: Handlebars.compile($('#error-product').html()),
  events: {
    'keyup .Search': 'serch'
  },

  initialize: function () {
    var collectionData = {collection: this.collection};
    this.paginateView = new PaginateView(collectionData);

    this.collection.on('goTo', this.changePage, this);
    this.collection.on('destroy', this.countProduct, this);
    
    this.listenTo(this.collection, 'notProduct', function (message) {
      this.message = message;
    });
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
        this.emptyProduct(this.message);
       }
    }.bind(this))
  },

  addAll: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (product) {
    var productView = new ProductView({model:product});

    this.$tbody.append(productView.render().el);
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

  countProduct: function () {
    var countProduct = this.collection.length;

    if (countProduct == 0) {
      var message = 'No hay productos registrados';

      this.emptyProduct(message);
    }
  },

  getPaginateView: function () {
    this.$el.append(this.paginateView.render().el);
  },

  emptyList: function () {
    this.$tbody.empty()
  },

  emptyProduct: function (message) {
    var erroMessage = {message: message};
    var boxError = this.boxError(erroMessage);

    this.$el.html(boxError);
  },

  close: function () {
    this.paginateView.close();
    this.remove();
  }
})