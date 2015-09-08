var Backbone   = require('backbone');
var Subroute   = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var PermitCtrl = require('../controller/permitController');

module.exports = Subroute.extend({
  routes: {
    'register' : 'register',
    'extend/register': 'registerExtend'
  },

  initialize: function () {
    this.permitCtrl = new PermitCtrl();
  },

  before: {
    '*any' : 'checkParent'
  },

  checkParent: function (fragment, args, next) {
    var parent = Backbone.Main.Employee;

    parent.loadEmployee(fragment, null, function () {
      next();
    })
  },
  
  register: function (employeeId) {
    this.permitCtrl.showForm(employeeId);
  },

  registerExtend: function (employeeId) {
    this.permitCtrl.showFormSpecial(employeeId);
  }

})