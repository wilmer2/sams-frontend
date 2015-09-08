var Backbone   = require('backbone');
var $          = require('jquery');
var Subroute   = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var Record     = require('../model/record');
var FormRecord = require('../view/formRecord');
var RecordEdit = require('../view/recordEditView');
var RecordData = require('../view/recordDataView');

module.exports = Subroute.extend({
  routes: {
    'register' : 'register',
    ':idRecod/edit': 'editRecord',
    ':idRecod': 'show'
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
    this.record = new Record;
  },

  register: function (id) {
    var elder = Backbone.Main.Elder.elder;
    $.get(Backend_url + 'state/record/' + id)
      .done(function (res) {
        if (res.status == 'success') {
          elder.set({recordState: res.recordState});
          var formRecord = new FormRecord({model: elder});
          appView.showElderView(formRecord);
        }
      });
  },

  editRecord: function (idElder, idRecord) {
    var recordEdit = new RecordEdit({model: this.record});
    this.getRecord(idElder, idRecord)
      .then(function (record) {
        this.record.set(record);
        appView.showElderView(recordEdit);
      }.bind(this))
      .catch(function (err) {
        if (err.status == 404) {
          this.record.clear({silent: true});
          this.record.set({notFound: true}, {silent:true});
          appView.showElderView(recordEdit);
        }
      }.bind(this))
  },

  show: function (idElder, idRecord) {
    var recordData = new RecordData({model: this.record});
    this.getRecord(idElder, idRecord)
      .then(function (record) {
        this.record.set(record);
        appView.showElderView(recordData);
      }.bind(this))
      .catch(function (err) {
        if (err.status == 404) {
          this.record.clear({silent: true});
          this.record.set({notFound: true}, {silent:true});
          appView.showElderView(recordData);
        }
      }.bind(this))
  },

  getRecord: function (idElder, idRecord) {
    return new Promise(function (resolve, reject) {
       $.get(Backend_url + 'show/record/'+ idElder + '/' + idRecord)
          .done(function (res) {
            resolve(res);
          })
          .fail(function (err) {
            reject(err);
          })
    })
  }

});

