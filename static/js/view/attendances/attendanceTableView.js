var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var PaginateView = require('../paginate/paginationView');
var AttendanceView = require('./attendanceRowView');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'attendances/templates/attendanceTable.html',
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
      var template = Handlebars.compile(template);
      var errorMessage;

      if (!_.isEmpty(this.message)) {
        if (_.isObject(this.message)) {
          util.showError(this.message);

          var message = 'No es posible ver asistencias';
          errorMessage = {message: message};
        } else {
          errorMessage = {message: this.message};
        }
      }

      var html = template(errorMessage);
      var totalAttendance = this.collection.length;

      this.$el.html(html);

      if (totalAttendance > 0) {
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

  close: function () {
    this.remove();
  }


});