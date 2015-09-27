var Backbone = require('backbone');
var $ = require('jquery');
var Permit = require('../model/permit');
var Permits = require('../collection/permits');
var PermitForm = require('../view/permit/permitNewView');
var PermitFormExtend = require('../view/permit/permitExtendNewView');
var PermitList = require('../view/permit/permitTableView');

function PermitCtrl () {
  this.showForm = function () {
    var employee = this.getEmployee();
    var permit = new Permit();
    var permitData = {model: permit, employee: employee};
    var permitForm = new PermitForm(permitData);

    appView.showEmployeeView(permitForm);
  },

  this.showFormExtend = function () {
    var employee = this.getEmployee();
    var permit = new Permit();
    var permitExtendData = {model: permit, employee: employee};
    var permitFormExtend = new PermitFormExtend(permitExtendData);

    appView.showEmployeeView(permitFormExtend);
  },

  this.showList = function (employeeId) {
    var permits = new Permits();
    console.log('test')
    var permitList = new PermitList({collection: permits});
    var url = Backend_url + 'employee/' + employeeId + '/permits';

    permits.updateUrl(url);
    permits.getFirstPage(fetchData)
    .done(function () {
      appView.showEmployeeView(permitList);
    })

  },

  this.getEmployee = function () {
    return Backbone.Main.Employee.employee;
  }
}


module.exports = PermitCtrl;