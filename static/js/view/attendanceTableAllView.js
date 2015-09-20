var Backbone          = require('backbone');
var $                 = require('jquery');
var _                 = require('underscore');
var Handlebars        = require('handlebars');
var PaginateView      = require('./paginationView');
var AssistanceAllView = require('./attendanceElementAllView');
var util              = require('../util/util');

module.exports = Backbone.View.extend({
  template: $('#assistance-tableAll').html(),
  boxError: Handlebars.compile($('#error-viewAssistance').html()),
  events: {
    'keyup .Search': 'serch'
  },
  
  initialize: function () {
    var collectionData = {collection: this.collection};
    this.paginateView = new PaginateView(collectionData);

    this.collection.on('goTo', this.changePage, this);
    
    this.listenTo(this.collection, 'notAttendance', function (message) {
      this.message = message;
    });
  },

  render: function () {
    if (_.isEmpty(this.message)) {
      this.$el.html(this.template);
      this.getPaginateView();

      this.$tbody = this.$el.find('table').children('tbody');

      this.addAll();
    } else {
      this.emptyAssistance(this.message);
    }
  },

  addAll: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (assistance) {
    var assistanceView = new AssistanceAllView({model: assistance});

    this.$tbody.append(assistanceView.render().el);
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
    this.$el.prepend(this.paginateView.render().el);
  },

  emptyList: function () {
    this.$tbody.empty()
  },

  emptyAssistance: function (message) {
    var erroMessage = {message: message};
    var boxError = this.boxError(erroMessage);

    this.$el.html(boxError);
  },

  close: function () {
    this.paginateView.close();
    this.remove();
  }

});