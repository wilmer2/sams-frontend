var $                 = require('jquery');
var Permit            = require('../model/permit');
var PermitForm        = require('../view/permitForm');
var PermitFormSpecial = require('../view/permitFormSpecial');

function PermitCtrl () {
  this.showForm = function (employeeId) {
    var permit = this.instPermit();
    var permitForm = new PermitForm({model: permit});
    var employeData = {employee_id: employeeId};

    permit.set(employeData, silentData);
    appView.showEmployeeView(permitForm);
  },

  this.showFormSpecial = function (employeeId) {
    var permit = this.instPermit();
    var permitFormSpecial = new PermitFormSpecial({model: permit});
    var employeData = {employee_id: employeeId};

    permit.set(employeData, silentData);
    appView.showEmployeeView(permitFormSpecial);
  },

  this.instPermit = function () {
    return new Permit();
  }
}


module.exports = PermitCtrl;