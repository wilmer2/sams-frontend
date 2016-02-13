var $ = require('jquery');
var Attendances = require('../collection/attendances');
var AttendanceEntryTable = require('../view/attendances/attendanceEntryTableView');
var AttendanceOutTable = require('../view/attendances/attendanceOutTableView');
var AttendanceContent = require('../view/attendances/attendanceContentView');


function AttendanceCtrl () {
  this.entryAttendance = function () {
    var attendances = new Attendances();
    var attendanceEntryData = {collection: attendances};
    var attendanceEntry = new AttendanceEntryTable(attendanceEntryData);

    attendances.getFirstPage(fetchData)
    .done(function () {
      appView.showUserView(attendanceEntry);
    })
    
  },

  this.outAttendance = function () {
    var attendances = new Attendances();
    var attendanceOutData = {collection: attendances};
    var attendanceOut = new AttendanceOutTable(attendanceOutData);

    attendances.getFirstPage(fetchData)
    .done(function () {
      appView.showUserView(attendanceOut);
    });
  },

  this.dateAttendance = function () {
    var attendanceContent = new AttendanceContent();

    appView.showUserView(attendanceContent);
  }

  
}

module.exports = AttendanceCtrl;
