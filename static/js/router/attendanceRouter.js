var Backbone = require('backbone');
var Subroute = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var AttendanceCtrl = require('../controller/attendanceController');


module.exports = Subroute.extend({
  routes: {
    '': 'attendanceEntry',
    'outputs': 'attendanceOutputs',
  },


  initialize: function () {
    this.attendanceCtrl = new AttendanceCtrl();
  },

  before: {
    '*any': 'loadMenu'
  },

  loadMenu: function (fragment, args, next) {
    Backbone.Main
             .renderMenuUser()
             .then(next);
  },

  attendanceEntry: function () {
    this.attendanceCtrl.entryAttendance();
  },

  attendanceOutputs: function () {
    this.attendanceCtrl.outAttendance();
  }
})