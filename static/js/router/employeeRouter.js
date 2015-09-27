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
    ':employeeId/permit/*subroute': 'invokePermit'
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

  invokePermit: function (subroute)  {
    if (!Backbone.Main.Permit) {
      Backbone.Main.Permit = new PermitRouter('employee/:employeeId/permit/');
    }
  }


})






























// var Backbone = require('backbone');
// var $ = require('jquery');
// var Subroute = require('../../dependencies/backboneSubroutes/backboneSubroutes');
// var Employee = require('../model/employee');
// var EmployeeMenu = require('../view/menuEmployeeView');
// var EmployeeCtrl = require('../controller/employeeController');
// var AttendanceCtrl = require('../controller/attendanceController');
// var ScheduleCtrl = require('../controller/scheduleController');
// var PermitRouter = require('./permitRouter');
// var util = require('../util/util');


// module.exports = Subroute.extend({
//   routes : {
//     ':employeeId' : 'show',
//     // ':id/schedule/register' : 'formSchedule',
//     // ':id/edit' : 'edit',
//     // ':id/attendances': 'showAttendances',
//     // ':id/schedule/:scheduleId' : 'showSchedule',
//     // ':id/schedule/:scheduleId/change' : 'changeSchedule',
//     // ':id/permit/*subroute' : 'invokePermit'
//   },

//   initialize: function () {
//     this.employee       = new Employee();
//     this.employeeMenu   = new EmployeeMenu({model: this.employee});
//     this.employeeCtrl   = new EmployeeCtrl();
//     this.attendanceCtrl = new AttendanceCtrl();
//     this.scheduleCtrl   = new ScheduleCtrl();
//   },

//   before: {
//     '*any' : 'loadEmployee'
//   },

//   loadEmployee: function (fragment, args, next) {
//     Backbone.Main.renderHeader();

//     var id = util.getFragmentId(fragment);

//     this.employee.set({id: id});

//     if (this.employee.hasChanged('id')) {
//       this.employeeCtrl.getEmployee(id)
//       .then(function (res) {
//         if (res.status == 'success') {
//           this.employee.set(res.employee);
//           this.employeeMenu.render();
//           next();
//         }
//       }.bind(this))
//       .catch(function (err) {
//         if (err.status == 404) {
//           this.employee.clear({silent:true});
//           this.employee.set({notFound: true}, {silent: true});
//           this.employeeMenu.render();
//         }
//       }.bind(this))
//     } else {
//       this.employeeMenu.render();
//       next();
//     }

//   },

//   show: function () {
//     this.employeeCtrl.showEmployee(this.employee);
//   },

//   edit: function () {
//     this.employeeCtrl.showEdit(this.employee);
//   },

//   formSchedule: function () {
//     this.scheduleCtrl.formScheduleEmp(this.employee);
//   },

//   showSchedule: function (employeeId, scheduleId) {
//     this.scheduleCtrl.showEmp(employeeId, scheduleId);
//   },

//   showAttendances: function (employeeId) {
//     this.attendanceCtrl.employeeAttendance(employeeId);
//   },

//   changeSchedule: function (employeeId, scheduleId) {
//     this.scheduleCtrl.editScheduleEmp(employeeId, scheduleId);
//   },

//   invokePermit: function (subroute) {
//     if (!Backbone.Main.Permit) {
//       Backbone.Main.Permit = new PermitRouter('employee/:id/permit/');
//     }
//   }

// })