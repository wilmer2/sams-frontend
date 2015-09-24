var Backbone = require('backbone');
var Subroute = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var RecordCtrl = require('../controller/recordController');

module.exports = Subroute.extend({
  routes: {
    'register' : 'register',
    'list': 'list',
    ':recordId':'show',
    ':recordId/edit': 'edit'
    
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
    this.recordCtrl = new RecordCtrl();
  },

  register: function () {
    this.recordCtrl.showForm();
  },

  show: function (elderId, recordId) {
    this.recordCtrl.show(elderId, recordId);
  },

  edit: function (elderId, recordId) {
    this.recordCtrl.edit(elderId, recordId);
  },

  list: function (elderId) {
    this.recordCtrl.list(elderId);
  }

/*  register: function (id) {
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
  }*/

});

