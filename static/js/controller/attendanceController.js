var $ = require('jquery');
var Attendances = require('../collection/attendances');
var AttendanceEntryTable = require('../view/attendances/attendanceEntryTableView');
var AttendanceOutTable = require('../view/attendances/attendanceOutTableView');
/*var AttendanceTableOut = require('../view/attendanceTableOutView');
var AttendanceTableEmp = require('../view/attendanceTableEmployeeView');
var AttendancesContent = require('../view/attendanceContentView');*/

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
  }

  /*this.allAttendance = function () {
    var attendancesContent = new AttendancesContent();

    appView.showAdminView(attendancesContent);
  },

  this.employeeAttendance = function (employeeId) {
    var attendances = this.instAttendance();
    var attendanceTableEmp = new AttendanceTableEmp({collection: attendances});
    var url = Backend_url + 'employee/' + employeeId + '/attendances';
    
    attendances.updateUrl(url);
    attendances.getFirstPage(fetchData)
    .done(function () {
      appView.showEmployeeView(attendanceTableEmp);
    });
  },*/
}

module.exports = AttendanceCtrl;
