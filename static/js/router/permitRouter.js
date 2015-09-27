var Backbone = require('backbone');
var Subroute = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var PermitCtrl = require('../controller/permitController');


module.exports = Subroute.extend({
  routes: {
    '': 'register',
    'extend': 'registerExtend',
    'list': 'list'
  },

  initialize: function () {
    this.permitCtrl = new PermitCtrl();
  },

  register: function () {
    this.permitCtrl.showForm();
  },

  registerExtend: function () {
    this.permitCtrl.showFormExtend();
  },

  list: function (employeeId) {
    this.permitCtrl.showList(employeeId);
  }
})