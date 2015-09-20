var Backbone = require('backbone');
var Subroute = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var EventCtrl = require('../controller/eventController');

module.exports = Subroute.extend({
  routes: {
    'register': 'register',
    'list': 'list',
    ':id': 'show',
    ':id/edit': 'edit',
  },

  initialize: function () {
    this.eventCtrl = new EventCtrl();
  },

  register: function () {
    this.eventCtrl.showForm();
  },

  show: function (eventId) {
    this.eventCtrl.show(eventId);
  },

  edit: function (eventId) {
    this.eventCtrl.edit(eventId);
  },

  list: function () {
    this.eventCtrl.list();
  }
})
