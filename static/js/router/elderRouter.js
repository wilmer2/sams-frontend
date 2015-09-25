var Backbone = require('backbone');
var Subroute = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var Elder = require('../model/elder');
var ElderMenu = require('../view/menu/menuElderView');
var ElderCtrl = require('../controller/elderController');
var InstanceCtrl = require('../controller/instanceController');
var OutputCtrl = require('../controller/outputController');
var RecordRouter = require('./recordRouter');
var CitationRouter = require('./citationRouter');
var OccurrenceRouter = require('./occurrenceRouter');
var util = require('../util/util');

module.exports = Subroute.extend({
  routes: {
    ':elderId': 'show',
    ':elderId/edit': 'edit',
    ':elderId/instance-waiting': 'instanceWaitingShow',
    ':elderId/instance/:instanceId': 'instanceShow',
    ':elderId/instance/:instanceId/edit': 'instanceEdit',
    ':elderId/instances': 'instanceList',
    ':elderId/output/register': 'outputRegister',
    ':elderId/output-pernot/register': 'outputPernotRegister',
    ':elderId/output/list': 'outputList',
    ':elderId/output/:outputId': 'outputShow',
    ':elderId/output/:outputId/edit': 'outputEdit',
    ':elderId/record/*subroute': 'invokeRecord',
    ':elderId/citation/*subroute': 'invokeCitation',
    ':elderId/occurrence/*subroute': 'invokeOccurrence'
   /* ':id/edit'             : 'edit',
    ':id/record/*subroute' : 'invokeRecord',*/
  },

  initialize: function () {
    this.elder = new Elder();
    this.elderMenu = new ElderMenu({model: this.elder});
    this.elderCtrl = new ElderCtrl();
    this.outputCtrl = new OutputCtrl;
    this.instanceCtrl = new InstanceCtrl();
  },

  before: {
    '*any' : 'loadElder',
  },

  loadElder: function (fragment, args, next) {
    Backbone.Main.renderHeader();

    var elderId = util.getFragmentId(fragment);
    
    this.elder.set({id: elderId});

    if (this.elder.hasChanged('id')) {
      this.elderCtrl.getElder(elderId)
      .then(function (data) {
        this.elder.set(data);
        appView
          .showMenuView(this.elderMenu)
          .then(next);
      }.bind(this))
      .catch(function (err) {
        if (err.status == 404) {
          window.location.replace('#notFound');
        } else {
          util.checkErr(err);
        }
      }.bind(this))
    } else {
      appView
        .showMenuView(this.elderMenu)
        .then(next);
    }

  },

  show: function () {
    this.elderCtrl.show(this.elder);
  },

  edit: function () {
    this.elderCtrl.edit(this.elder);
  },

  instanceShow: function (elderId, instanceId) {
    this.instanceCtrl.show(elderId, instanceId);
  },

  instanceWaitingShow: function (elderId) {
    this.instanceCtrl.showWaiting(elderId);
  },

 
  instanceEdit: function (elderId, instanceId) {
    this.instanceCtrl.edit(elderId, instanceId);
  },

  instanceList: function (elderId) {
    this.instanceCtrl.listElder(elderId);
  },

  outputRegister: function () {
    this.outputCtrl.showForm();
  },

  outputPernotRegister: function () {
    this.outputCtrl.showFormPernot();
  },

  outputList: function (elderId) {
    this.outputCtrl.showListElder(elderId);
  },

  outputShow: function (elderId, outputId) {
    this.outputCtrl.show(elderId, outputId);
  },

  outputEdit: function (elderId, outputId) {
    this.outputCtrl.edit(elderId, outputId);
  },

  invokeRecord: function (subroute) {
    if (!Backbone.Main.Record) {
      Backbone.Main.Record = new RecordRouter('elder/:elderId/record/');
    }
  },

  invokeCitation: function (subroute) {
    if (!Backbone.Main.Citation) {
      Backbone.Main.Citation = new CitationRouter('elder/:elderId/citation/');
    }
  },

  invokeOccurrence: function (subroute) {
    if (!Backbone.Main.Occurrence) {
      Backbone.Main.Occurrence = new OccurrenceRouter('elder/:elderId/occurrence/');
    }
  }

  // test: function () {
  //   this.instanceCtrl.test();
  // }



  // edit: function () {
  //   this.elderCtrl.showEdit(this.elder);
  // },

  // instWaiting: function () {
  //   var elderId = this.elder.get('id');

  //   this.instCtrl.showWaiting(elderId);
  // },

  

 
})

