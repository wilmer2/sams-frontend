var $                = require('jquery');
var Schedule         = require('../model/schedule');
var ScheduleEmpView  = require('../view/scheduleEmployeeView');
var ScheduleFormEmp  = require('../view/scheduleFormEmp');
var ScheduleEditEmp  = require('../view/scheduleEditEmployee');

function scheduleCtrl () {
  this.getSchedule = function () {
    return new Schedule();
  },

  this.formScheduleEmp = function (employee) {
    var formScheduleEmp = new ScheduleFormEmp({model: employee});

    appView.showEmployeeView(formScheduleEmp);
  },

  this.showEmp = function (employeeId, scheduleId) {
    var schedule = this.getSchedule();
    var scheduleEmpView = new ScheduleEmpView({model: schedule});

    this.scheduleInEmp(scheduleId, employeeId)
    .then(function (res) {
      if (res.status == 'success') {
        var employeeData = {employee_id: employeeId};
        var scheduleData = res.schedule;

        schedule.set(employeeData, silentData);
        schedule.set(scheduleData);
        appView.showEmployeeView(scheduleEmpView);
      }
    })
    .catch(function (err) {
      if (err.status == 404) {
        schedule.set(notFound, silentData);
        appView.showEmployeeView(scheduleEmpView);
      }
    })
  },

  this.editScheduleEmp = function (employeeId, scheduleId) {
    var schedule = this.getSchedule();
    var scheduleEditEmp = new ScheduleEditEmp({model: schedule});

    this.scheduleInEmp(scheduleId, employeeId)
    .then(function (res) {
      if (res.status == 'success') {
        var employeeData = {employee_id: employeeId};
        var scheduleData = res.schedule;

        schedule.set(scheduleData, silentData);
        schedule.set(res.schedule);
        appView.showEmployeeView(scheduleEditEmp);
      }
    })
    .catch(function (err) {
      if (err.status == 404) {
        schedule.set(notFound, silentData);
        appView.showEmployeeView(scheduleEditEmp);
      }
    })
  },

  this.scheduleInEmp = function (scheduleId, employeeId) {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'schedule/' + scheduleId + '/employee/' + employeeId)
       .done(function (res) {
        resolve(res);
       })
       .fail(function (err) {
        reject(err);
       })
    })
  }
}

module.exports = scheduleCtrl;