var Backbone     = require('backbone');
var $            = require('jquery');
var Subroute     = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var Employee     = require('../model/employee');
var EmployeeMenu = require('../view/menuEmployeeView');
var EmployeeCtrl = require('../controller/employeeController');
var ScheduleCtrl = require('../controller/scheduleController');
var PermitRouter = require('./permitRouter');
var util         = require('../util/util');


module.exports = Subroute.extend({
  routes : {
    ':id' : 'show',
    ':id/schedule/register' : 'formSchedule',
    ':id/edit' : 'edit',
    ':id/schedule/:scheduleId' : 'showSchedule',
    ':id/schedule/:scheduleId/change' : 'changeSchedule',
    ':id/permit/*subroute' : 'invokePermit'
  },

  initialize: function () {
    this.employee     = new Employee();
    this.employeeMenu = new EmployeeMenu({model: this.employee});
    this.employeeCtrl = new EmployeeCtrl();
    this.scheduleCtrl = new ScheduleCtrl();
  },

  before: {
    '*any' : 'loadEmployee'
  },

  loadEmployee: function (fragment, args, next) {
    Backbone.Main.renderHeader();

    var id = util.getFragmentId(fragment);

    this.employee.set({id: id});

    if (this.employee.hasChanged('id')) {
      this.employeeCtrl.getEmployee(id)
      .then(function (res) {
        if (res.status == 'success') {
          this.employee.set(res.employee);
          this.employeeMenu.render();
          next();
        }
      }.bind(this))
      .catch(function (err) {
        if (err.status == 404) {
          this.employee.clear({silent:true});
          this.employee.set({notFound: true}, {silent: true});
          this.employeeMenu.render();
        }
      }.bind(this))
    } else {
      this.employeeMenu.render();
      next();
    }

  },

  show: function () {
    this.employeeCtrl.showEmployee(this.employee);
  },

  edit: function () {
    this.employeeCtrl.showEdit(this.employee);
  },

  formSchedule: function () {
    this.scheduleCtrl.formScheduleEmp(this.employee);
  },

  showSchedule: function (employeeId, scheduleId) {
    this.scheduleCtrl.showEmp(employeeId, scheduleId);
  },

  changeSchedule: function (employeeId, scheduleId) {
    this.scheduleCtrl.editScheduleEmp(employeeId, scheduleId);
  },

  invokePermit: function (subroute) {
    if (!Backbone.Main.Permit) {
      Backbone.Main.Permit = new PermitRouter('employee/:id/permit/');
    }
  }

})