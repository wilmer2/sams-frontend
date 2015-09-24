var Backbone = require('backbone');
var Subroute = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var OccurrenceCtrl = require('../controller/occurrenceController');

module.exports = Subroute.extend({
  routes: {
    'register' : 'register',
    'list': 'list',
    ':occurrenceId': 'show',
    ':occurrenceId/edit': 'edit'
  },

  before: {
    '*any': 'checkParent'
  },

  checkParent: function (fragment, args, next) {
    var parent = Backbone.Main.Elder;
  
    parent.loadElder(fragment, null, function () {
      next();
    });
  },

  initialize: function () {
    this.occurrenceCtrl = new OccurrenceCtrl();
  },

  register: function () {
    this.occurrenceCtrl.showForm();
  },

  show: function (elderId, occurrenceId) {
    this.occurrenceCtrl.show(elderId, occurrenceId);
  },
  
  edit:function (elderId, occurrenceId) {
    this.occurrenceCtrl.edit(elderId, occurrenceId);
  },

  list: function (elderId) {
    this.occurrenceCtrl.list(elderId);
  }
})