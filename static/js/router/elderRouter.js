var Backbone        = require('backbone');
var $               = require('jquery');
var Subroute        = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var Elder           = require('../model/elder');
var Instance        = require('../model/instance');
var ElderMenu       = require('../view/menuElderView');
var ElderData       = require('../view/elderDataView');
var ElderEdit       = require('../view/elderEditView');
var InstanceWaiting = require('../view/instanceWaitingView');
var ErrorView       = require('../view/errorElderView');
var RecordRouter    = require('./recordRouter');

var util = require('../util/util');

module.exports = Subroute.extend({
  routes: {
    ':id'                  : 'homeElder',
    ':id/instance-waiting' : 'showInstanceWaiting',
    ':id/edit'             : 'elderEdit',
    ':id/record/*subroute' : 'invokeRecord',
  },

  initialize: function () {
    this.elder     = new Elder();
    this.instance  = new Instance();
    this.elderMenu = new ElderMenu({model: this.elder});
    this.elderData = new ElderData({model: this.elder});
  },

  before: {
    '*any' : 'loadElder',
  },

  loadElder: function (fragment, args, next) {
    Backbone.Main.renderHeader();

    var segment = fragment.split('/');
    var idELder = segment[1];

    this.elder.set({id: idELder});

    if (this.elder.hasChanged('id')) {
      this.getElder(idELder)
        .then(function (data) {
          if (data.status == 'success') {
            this.elder.set(data.elder);
            this.elderMenu.render();
            next();
          }
        }.bind(this))
        .catch(function (err) {
           this.checkErr(err);
        }.bind(util))
    } else {
       this.elderMenu.render();
       next();
    }

  },

  homeElder: function (id) {
    var instance = this.elder.get('instance');

    if (instance > 0) {
      window.location.replace('#elder/' + id + '/instance-waiting');
    } else {
       appView.showElderView(this.elderData);
    }
  },

  showInstanceWaiting: function (id) {
    var instanceWaiting = new InstanceWaiting({model: this.instance});

    $.get(Backend_url + 'waiting/notifications/' + id)
      .done(function (data) {
        if (data.status == 'success') {
          var identityCard = this.elder.get('identity_card');
          var fullName     = this.elder.get('full_name');
          this.instance.set({full_name: fullName, identity_card: identityCard,id: id});
          this.instance.set(data.instance);
          appView.showElderView(instanceWaiting);
        } else {
          this.showError(data.message);
        }
      }.bind(this));
  },

  elderEdit: function () {
    var elderEdit = new ElderEdit({model: this.elder});
    appView.showElderView(elderEdit);
  },

  showError: function (message) {
     var errorView = new ErrorView();
     
     errorView.addMessage(message);
     appView.showElderView(errorView);
  },

  getElder: function (id) {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'elder/' + id)
        .done(function (data) {
          resolve(data);
        })
        .fail(function (err) {
          reject(err);
        })
    })
  },

  invokeRecord: function (subroute) {
    if (!Backbone.Main.Record) {
      Backbone.Main.Record = new RecordRouter('elder/:id/record/');
    }
  }
 
})

