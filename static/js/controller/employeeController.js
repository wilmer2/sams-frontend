var $ = require('jquery');
var Employee = require('../model/employee');
var Employees = require('../collection/employees');
var EmployeeList = require('../view/employee/employeeTableView');
var EmployeeForm = require('../view/employee/employeeNewView');
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