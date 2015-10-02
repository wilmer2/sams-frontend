var $ = require('jquery');
var Employee = require('../model/employee');
var User = require('../model/user');
var Employees = require('../collection/employees');
var Schedules = require('../collection/schedules');
var Attendances = require('../collection/attendances');
var UserView = require('../view/user/userShowView');
var UserEdit = require('../view/user/userEditView');
var EmployeeForm = require('../view/employee/employeeNewView');
var EmployeeEdit = require('../view/employee/employeeEditView');
var EmployeeList = require('../view/employee/employeeTableView');
var EmployeeShow = require('../view/employee/employeeShowView');
var EmployeeSchedule = require('../view/employee/employeeScheduleNewView');
var EmployeeScheduleList = require('../view/employee/employeeTableScheduleView');
var EmployeeAttendances = require('../view/employee/employeeTableAssistanceView');

function EmployeeCtrl () {

  this.showForm = function () {
    var employee = new Employee();
    var employeeForm = new EmployeeForm({model:employee});

    appView.showUserView(employeeForm);
  },

  this.show = function (employee) {
    var employeeShow = new EmployeeShow({model: employee});

    appView.showEmployeeView(employeeShow);
  },

  this.edit = function (employee) {
    var employeeEdit = new EmployeeEdit({model: employee});

    appView.showEmployeeView(employeeEdit);
  },

  this.showList = function () {
    var employees = new Employees();
    var employeeList = new EmployeeList({collection: employees});

    employees.getFirstPage(fetchData)
    .done(function () {
      appView.showUserView(employeeList);
    })
  },

 
  this.formSchedule = function (employee) {
    var employeeSchedule = new EmployeeSchedule({model: employee});

    appView.showEmployeeView(employeeSchedule);
  },

  this.listSchedule = function (employeeId) {
    var schedules = new Schedules();
    var scheduleList = new EmployeeScheduleList({collection: schedules});
    var url = Backend_url + 'employee/' + employeeId + '/schedules';

    schedules.updateUrl(url);
    schedules.fetch(fetchData)
    .done(function () {
      appView.showEmployeeView(scheduleList);
    })
  },

  this.showUser = function (employeeId) {
    var user = new User();
    var userView = new UserView({model:user});

    this.getUser(employeeId)
    .then(function (data) {
      user.set(data);
      appView.showEmployeeView(userView);
    })
    .catch(function (err) {
      user.set({employee_id: employeeId});
      user.set(notFound, silentData);
      appView.showEmployeeView(userView);
    })
  },

  this.showAttendances = function (employeeId) {
    var attendances = new Attendances();
    var employeeAttendances = new EmployeeAttendances({collection: attendances});
    var url = Backend_url + 'employee/' + employeeId + '/attendances';

    attendances.updateUrl(url);
    attendances.getFirstPage(fetchData)
    .done(function () {
      appView.showEmployeeView(employeeAttendances);
    })
  },

  this.editUser = function (employeeId) {
    var user = new User();
    var userEdit = new UserEdit({model: user});

    this.getUser(employeeId)
    .then(function (data) {
      user.set(data);
      appView.showEmployeeView(userEdit);
    })
    .catch(function (err) {
      window.location.replace('#employee/' + employeeId + '/user')
    })
  },

  this.getEmployee = function (employeeId) {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'employee/' + employeeId)
       .done(function (res) {
        if (res.status == 'success') {
          var data = res.data;

          resolve(data);
        }
       })
       .fail(function (err) {
        reject(err);
       })
    })
  },

  this.getUser = function (employeeId) {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'employee/' + employeeId + '/user/show')
       .done(function (res) {
        if (res.status == 'success') {
          var data = res.data;

          resolve(data);
        }
       })
       .fail(function (err) {
        if (err.status == 404) {
          reject(err);
        }
       })
    })
  }
  // this.showEmployee = function (employee) {
  //   var employeeView = new EmployeeData({model: employee});
  //   appView.showEmployeeView(employeeView);
  // },

  // this.showEdit = function (employee) {
  //   var editView = new EmployeeEdit({model: employee});
  //   appView.showEmployeeView(editView);
  // },

  // this.getEmployee = function (employeeId) {
  //   return new Promise(function (resolve, reject) {
  //     $.get(Backend_url + 'employee/' + employeeId)
  //       .done(function (res) {
  //         resolve(res);
  //       })
  //       .fail(function (err) {
  //         reject(err);
  //       });
  //   });
  // }
}

module.exports = EmployeeCtrl;