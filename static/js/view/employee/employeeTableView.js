var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var PaginateView = require('../paginate/paginationView');
var EmployeeView = require('./employeeRowView');

module.exports = Backbone.View.extend({
  template: 'employee/templates/employeeTable.html',
  className: 'employeeTableView',

  events: {
    'keyup .Search': 'search',
  },

  initialize: function () {
    var collectionData = {collection: this.collection};
    this.paginateView = new PaginateView(collectionData);

    this.collection.on('goTo', this.changePage, this);
    
    this.listenTo(this.collection, 'notEmployee', function (message) {
      this.message = message;
    });
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var errorMessage = {message: this.message};
      var html = template(errorMessage);

      this.$el.html(html);

      if (_.isEmpty(this.message)) {
        this.getPaginateView();

        this.$tbody = this
                       .$el
                       .find('table')
                       .children('tbody');

        this.addAll();
      } 
    }.bind(this))
  },

  addAll: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (employee) {
    var employeeView = new EmployeeView({model:employee});

    this.$tbody.append(employeeView.render().el);
  },

  changePage: function () {
    this.emptyList();
    this.getPaginateView();
    this.addAll();
  },

  getPaginateView: function () {
    this.$el.prepend(this.paginateView.render().el);
  },

  search: function (e) {
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

  emptyList: function () {
    this.$tbody.empty()
  },

  emptyEmployee: function (message) {
    var errorMessage = {message: message};
    var boxError = this.boxError(errorMessage);

    this.$el.html(boxError);
  },

  close: function () {
    this.paginateView.close();
    this.remove();
  }

})