var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var PaginateView = require('../paginate/paginationView');
var AttendanceView = require('./attendanceRowView');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'attendances/templates/attendanceTable.html',
  boxError: 'attendances/templates/attendanceError.html',
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
    $.get(rootView + this.template, function (template) {
      if (_.isEmpty(this.message)) {
        var template = template;

        this.$el.html(template);
        this.getPaginateView();

        this.$tbody = this
                        .$el.find('table')
                        .children('tbody');

        this.addAll();
      } else {
        this.emptyAssistance(this.message);
      }
    }.bind(this))
   
  },

  addAll: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (attendance) {
    var attendanceView = new AttendanceView({model: attendance});

    this
      .$tbody
      .append(attendanceView.render().el);
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
    $.get(rootView + this.boxError, function (template) {
      var template =  Handlebars.compile(template);
      var errorMessage = {message: message};
      var boxError = template(errorMessage);

      this.$el.html(boxError)

    }.bind(this))
  }

});