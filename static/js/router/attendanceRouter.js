var Backbone       = require('backbone');
var Subroute       = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var AttendanceCtrl = require('../controller/attendanceController');


module.exports = Subroute.extend({
  routes: {
    '': 'attendanceToday'
  },

  before: {
    'attendance/': 'renderMenuUser'
  },

  initialize: function () {
    this.attendanceCtrl = new AttendanceCtrl();
  },

  renderMenuUser: function (fragment, args, next) {
    Backbone.Main.renderMenu();
    next();
  },

  attendanceToday: function () {
    this.attendanceCtrl.showAttendance();
  }

})