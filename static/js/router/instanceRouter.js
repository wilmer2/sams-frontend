var Backbone = require('backbone');
var Subroute = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var InstanceCtrl = require('../controller/instanceController');

module.exports = Subroute.extend({
  routes: {
    'register': 'register',
    '': 'listForDate',
    'waiting' : 'listWaiting',
  },

  initialize: function () {
    this.instanceCtrl = new InstanceCtrl();
  },

  register: function () {
    this.instanceCtrl.showForm();
  },

  listForDate: function () {
    this.instanceCtrl.listForDate();
  },

  listWaiting: function () {
    this.instanceCtrl.listWaiting();
  }
})