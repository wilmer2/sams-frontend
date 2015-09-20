var Backbone = require('backbone');
var Subroute = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var AttendanceCtrl = require('../controller/attendanceController');


module.exports = Subroute.extend({
  routes: {
    '': 'attendanceEntry',
    'outputs': 'attendanceOutputs',
    // 'date': 'attendanceDay'
  },

/*  before: {
    'attendance/': 'renderMenuUser',
    'attendance/outputs': 'renderMenuUser',
    'attendance/date': 'renderMenuAdmin'
  },*/

  initialize: function () {
    this.attendanceCtrl = new AttendanceCtrl();
  },

  /*renderMenuAdmin: function (fragment, args, next) {
    var user = Backbone.Main.userLogin;
    var group = user.get('group');

    if (group.name == 'User') {
      window.location.replace('#home/');
    } else {
      Backbone.Main.renderAdmin();
      next();
    }
  },

  renderMenuUser: function (fragment, args, next) {
    Backbone.Main.renderMenu();
    next();
  },*/

  attendanceEntry: function () {
    this.attendanceCtrl.entryAttendance();
  },

  attendanceOutputs: function () {
    this.attendanceCtrl.outAttendance();
  },

  /*attendanceDay: function () {
    this.attendanceCtrl.allAttendance();
  },
*/
})