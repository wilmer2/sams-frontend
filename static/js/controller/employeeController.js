var $ = require('jquery');
var Employee = require('../model/employee');
var Employees = require('../collection/employees');
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