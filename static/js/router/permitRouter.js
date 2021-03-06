var Backbone = require('backbone');
var Subroute = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var PermitCtrl = require('../controller/permitController');


module.exports = Subroute.extend({
  routes: {
    '': 'register',
    'extend': 'registerExtend',
    'list': 'list',
    ':permitId': 'show'
  },

  initialize: function () {
    this.permitCtrl = new PermitCtrl();
  },

  register: function () {
    this.permitCtrl.showForm();
  },

  show: function (employeeId, permitId) {
    this.permitCtrl.show(employeeId, permitId);
  },

  registerExtend: function () {
    this.permitCtrl.showFormExtend();
  },

  list: function (employeeId) {
    this.permitCtrl.showList(employeeId);
  }
})