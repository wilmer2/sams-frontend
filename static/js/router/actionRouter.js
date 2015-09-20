var Backbone = require('backbone');
var Subroute = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var ActionCtrl = require('../controller/actionController');

module.exports = Subroute.extend({
  routes: {
    'register': 'register'
  },

  initialize: function () {
    this.actionCtrl = new ActionCtrl();
  },

  register: function () {
    this.actionCtrl.showForm();
  }
})