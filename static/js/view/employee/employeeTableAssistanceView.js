var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var PaginateView = require('../paginate/paginationView');
var AssistanceEmployee = require('./employeeTableAssistanceRowView');

module.exports = Backbone.View.extend({
  template: 'employee/templates/employeeTableAssistance.html',

  initialize: function () {
    var collectionData = {collection: this.collection};
    this.paginateView = new PaginateView(collectionData);

    this.collection.on('goTo', this.changePage, this);
    this.listenTo(this.collection,'notAttendance', function (message) {
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

        this.$tbody = this.$el
                          .find('table')
                          .children('tbody');

        this.addAll();
      } 
    }.bind(this))
  },

  addAll: function () {
    this.collection
         .forEach(this.addOne, this);
  },

  addOne: function (assistance) {
    var assistanceEmployee = new AssistanceEmployee({model: assistance});

    this.$tbody
        .append(assistanceEmployee.render().el);
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

  close: function () {
    this.paginateView
        .close();
    this.remove();
  }
})