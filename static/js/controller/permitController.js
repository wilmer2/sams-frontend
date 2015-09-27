var Backbone = require('backbone');
var $ = require('jquery');
var Permit = require('../model/permit');
var Permits = require('../collection/permits');
var PermitForm = require('../view/permit/permitNewView');
var PermitShow = require('../view/permit/permitShowView');
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
    var permitList = new PermitList({collection: permits});
    var url = Backend_url + 'employee/' + employeeId + '/permits';

    permits.updateUrl(url);
    permits.getFirstPage(fetchData)
    .done(function () {
      appView.showEmployeeView(permitList);
    })

  },

  this.show = function (employeeId, permitId) {
    var permit = new Permit();
    var permitShow = new PermitShow({model: permit});

    this.getPermit(employeeId, permitId)
    .then(function (data) {
      permit.set(data, silentData);
      appView.showEmployeeView(permitShow);
    })
    .catch(function (err) {
      permit.set(notFound, silentData);
      appView.showEmployeeView(permitShow);
    })
  },

  this.getPermit = function (employeeId, permitId) {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'employee/' + employeeId + '/permit/' + permitId)
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
  },

  this.getEmployee = function () {
    return Backbone.Main.Employee.employee;
  }
}


module.exports = PermitCtrl;