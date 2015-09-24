var Backbone = require('backbone');
var Subroute = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var CitationCtrl = require('../controller/citationController');

module.exports = Subroute.extend({
  routes: {
    'register': 'register',
    'list': 'list',
    'waiting': 'listWaiting',
    ':citationId': 'show',
    ':citationId/edit': 'edit'
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
    this.citationCtrl = new CitationCtrl();
  },

  register: function () {
    this.citationCtrl.showForm();
  },

  show: function (elderId, citationId) {
    this.citationCtrl.show(elderId, citationId);
  },

  edit: function (elderId, citationId) {
    this.citationCtrl.edit(elderId, citationId);
  },

  list: function (elderId) {
    this.citationCtrl.list(elderId);
  },

  listWaiting: function (elderId) {
    this.citationCtrl.listWaiting(elderId);
  }


})