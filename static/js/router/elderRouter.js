var Backbone     = require('backbone');
var $            = require('jquery');
var Subroute     = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var Elder        = require('../model/elder');
var ElderMenu    = require('../view/menuElderView');
var ElderCtrl    = require('../controller/elderController');
var InstanceCtrl = require('../controller/instanceController');
var RecordRouter = require('./recordRouter');


var util = require('../util/util');

module.exports = Subroute.extend({
  routes: {
    ':id'                  : 'show',
    ':id/instance-waiting' : 'instWaiting',
    ':id/edit'             : 'edit',
    ':id/record/*subroute' : 'invokeRecord',
  },

  initialize: function () {
    this.elder     = new Elder();
    this.elderMenu = new ElderMenu({model: this.elder});
    this.elderCtrl = new ElderCtrl();
    this.instCtrl  = new InstanceCtrl();
  },

  before: {
    '*any' : 'loadElder',
  },

  loadElder: function (fragment, args, next, prueba) {
    Backbone.Main.renderHeader();

    var id = util.getFragmentId(fragment);
    
    this.elder.set({id: id});

    if (this.elder.hasChanged('id')) {
      this.elderCtrl.getElder(id)
      .then(function (data) {
        if (data.status == 'success') {
          this.elder.set(data.elder);
          this.elderMenu.render();
          next();
        }
      }.bind(this))
    } else {
       this.elderMenu.render();
       next();
    }

  },

  show: function () {
    this.elderCtrl.showElder(this.elder);
  },

  edit: function () {
    this.elderCtrl.showEdit(this.elder);
  },

  instWaiting: function () {
    var elderId = this.elder.get('id');

    this.instCtrl.showWaiting(elderId);
  },

  invokeRecord: function (subroute) {
    if (!Backbone.Main.Record) {
      Backbone.Main.Record = new RecordRouter('elder/:id/record/');
    }
  },

 
})

