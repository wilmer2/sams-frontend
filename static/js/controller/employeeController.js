var $            = require('jquery');
var EmployeeData = require('../view/employeeDataView');
var EmployeeEdit = require('../view/employeeEditView');

function employeeCtrl () {
  this.showEmployee = function (employee) {
    var employeeView = new EmployeeData({model: employee});
    appView.showEmployeeView(employeeView);
  },

  this.showEdit = function (employee) {
    var editView = new EmployeeEdit({model: employee});
    appView.showEmployeeView(editView);
  },

  this.getEmployee = function (employeeId) {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'employee/' + employeeId)
        .done(function (res) {
          resolve(res);
        })
        .fail(function (err) {
          reject(err);
        });
    });
  }
}

module.exports = employeeCtrl;