var $ = require('jquery');
var Employee = require('../model/employee');
var User = require('../model/user');
var Employees = require('../collection/employees');
var UserView = require('../view/user/userShowView');
var UserEdit = require('../view/user/userEditView');
var EmployeeForm = require('../view/employee/employeeNewView');
var EmployeeList = require('../view/employee/employeeTableView');
var EmployeeShow = require('../view/employee/employeeShowView');
// var EmployeeData = require('../view/employeeDataView');
// var EmployeeEdit = require('../view/employeeEditView');

function EmployeeCtrl () {

  this.showForm = function () {
    var employee = new Employee();
    var employeeForm = new EmployeeForm({model:employee});

    appView.showAdminView(employeeForm);
  },

  this.showList = function () {
    var employees = new Employees();
    var employeeList = new EmployeeList({collection: employees});

    employees.getFirstPage(fetchData)
    .done(function () {
      appView.showAdminView(employeeList);
    })
  },

  this.show = function (employee) {
    var employeeShow = new EmployeeShow({model: employee});

    appView.showEmployeeView(employeeShow);
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