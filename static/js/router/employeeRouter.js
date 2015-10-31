var Backbone = require('backbone');
var Subroute = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var Employee = require('../model/employee');
var EmployeeMenu = require('../view/menu/menuEmployeeView');
var EmployeeCtrl = require('../controller/employeeController');
var PermitRouter = require('./permitRouter');
var util = require('../util/util');

module.exports = Subroute.extend({
  routes: {
    ':employeeId': 'show',
    ':employeeId/edit': 'edit',
    ':employeeId/schedule': 'registerSchedule',
    ':employeeId/schedule/list': 'listSchedule',
    ':employeeId/user': 'showUser',
    ':employeeId/user/edit': 'editUser',
    ':employeeId/permit/*subroute': 'invokePermit',
    ':employeeId/attendances': 'attendances'
  },

  initialize: function () {
    this.employee = new Employee();
    this.employeeMenu = new EmployeeMenu({model: this.employee});
    this.employeeCtrl = new EmployeeCtrl();
  },

  before: {
    '*any': 'loadEmployee'
  },

  loadEmployee: function (fragment, args, next) {
    Backbone.Main.renderHeader();

    var employeeId = util.getFragmentId(fragment);

    this.employee.set({id: employeeId});

    if (this.employee.hasChanged('id')) {
      this.employeeCtrl.getEmployee(employeeId)
        .then(function (data) {
          this.employee.set(data);
          appView
            .showMenuView(this.employeeMenu)
            .then(next);
        }.bind(this))
        .catch(function (err) {
          if (err.status == 404) {
            window.location.replace('#notFound');
          } else {
            util.checkErr(err);
          }
        })
    } else {
      appView
        .showMenuView(this.employeeMenu)
        .then(next);
    }
  },

  show: function () {
    this.employeeCtrl.show(this.employee);
  },

  edit: function () {
    this.employeeCtrl.edit(this.employee);
  },

  showUser: function (employeeId) {
    this.employeeCtrl.showUser(employeeId);
  },

  editUser: function (employeeId) {
    this.employeeCtrl.editUser(employeeId);
  },

  registerSchedule: function () {
    this.employeeCtrl.formSchedule(this.employee);
  },

  listSchedule: function (employeeId) {
    this.employeeCtrl.listSchedule(employeeId);
  },

  attendances: function (employeeId) {
    this.employeeCtrl.showAttendances(employeeId);
  },

  invokePermit: function (subroute)  {
    if (!Backbone.Main.Permit) {
      Backbone.Main.Permit = new PermitRouter('employee/:employeeId/permit/');
    }
  }


})


















