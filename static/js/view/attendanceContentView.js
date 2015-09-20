var Backbone           = require('backbone');
var $                  = require('jquery');
var Attendances        = require('../collection/attendances');
var AttendanceTableAll = require('./attendanceTableAllView');
var util               = require('../util/util');

module.exports = Backbone.View.extend({
  template: $('#content-assitanceView').html(),
  events: {
    'submit #search-assistance': 'getDate'
  },

  render: function () {
    this.$el.html(this.template);

    this.$contentView = this.$el.find('#content-assistance');
    var date = util.currentDate();

    this.showAttendances(date);
  },

  getDate: function (e) {
    e.preventDefault();
    
    var date = $('.Search-date').val();

    this.showAttendances(date);
  },

  showAttendances: function (date) {
    var sooner = 1;
    var url = Backend_url + 'attendances?date=' + date +'&sooner=' + sooner;
    var attendances = new Attendances();
    var attendancesTable = new AttendanceTableAll({collection: attendances});

    attendances.updateUrl(url);
    attendances.getFirstPage(fetchData)
    .done(function () {
      this.renderContent(attendancesTable);
    }.bind(this))

  },

  renderContent: function (view) {
    if (this.currentView) {
      this.currentView.close();
    }

    this.currentView = view;

    this.currentView.render();
    this.$contentView.html(this.currentView.el);
  }


})