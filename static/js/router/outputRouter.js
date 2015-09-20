var Backbone = require('backbone');
var Subroute = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var OutputCtrl = require('../controller/outputController');


module.exports = Subroute.extend({
  routes: {
    '': 'outputs',
    'pernot': 'outputsPernot',
    'waiting': 'outputsWaiting',
    ':outputId/elder/:elderId/confirm': 'outputConf'
  },

  initialize: function () {
    this.outputCtrl = new OutputCtrl();
  },

  outputs: function () {
    this.outputCtrl.showListCasual();
  },

  outputsPernot: function () {
    this.outputCtrl.showListPernot();
  },

  outputsWaiting: function () {
    this.outputCtrl.showListWaiting();
  },

  outputConf: function (outputId, elderId) {
    this.outputCtrl.showConfirm(elderId, outputId);
  }



})