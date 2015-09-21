var Backbone = require('backbone');
var Subroute = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var ActionCtrl = require('../controller/actionController');

module.exports = Subroute.extend({
  routes: {
    'register': 'register',
    'list': 'list',
    'today': 'listToday',
    ':id': 'show',
    ':id/edit': 'edit',
    ':id/schedule': 'addSchedule',
  },

  initialize: function () {
    this.actionCtrl = new ActionCtrl();
  },

  register: function () {
    this.actionCtrl.showForm();
  },

  show: function (actionId) {
    this.actionCtrl.show(actionId);
  },

  edit: function (actionId) {
    this.actionCtrl.edit(actionId);
  },

  addSchedule: function (actionId) {
    this.actionCtrl.showSchedule(actionId);
  },

  list: function () {
    this.actionCtrl.list();
  },

  listToday: function () {
    this.actionCtrl.today();
  }
})