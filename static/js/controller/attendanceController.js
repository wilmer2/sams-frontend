var $                 = require('jquery');
var Attendances       = require('../collection/attendances');
var AttendanceTableIn = require('../view/attendanceTableInView');

function AttendanceCtrl () {
  this.showAttendance = function () {
    var attendances = this.instAttendance();
    var attendanceTableIn = new AttendanceTableIn({collection: attendances});

    attendances.getFirstPage(fetchData)
    .done(function () {
      appView.showUserView(attendanceTableIn);
    })
    
  },

  this.instAttendance = function () {
    return new Attendances();
  }
}

module.exports = AttendanceCtrl;
