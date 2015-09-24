var Backbone = require('backbone');
var $ = require('jquery');
var Record = require('../model/record');
var Records = require('../collection/records');
var RecordForm = require('../view/record/recordNewView');
var RecordShow = require('../view/record/recordShowView');
var RecordEdit = require('../view/record/recordEditView');
var RecordList = require('../view/record/recordTableView');

function RecordCtrl () {
  this.showForm = function () {
    var elder = Backbone.Main.Elder.elder;
    var elderId = elder.get('id');
    var recordForm = new RecordForm({model: elder});

    $.get(Backend_url + 'elder/' + elderId + '/record/state')
     .done(function (res) {
      if (res.status == 'success') {
        var recordState = res.recordState;

        elder.set({recordState: recordState});

        appView.showElderView(recordForm);
      }
     })
  },

  this.show = function (elderId, recordId) {
    var record = new Record();
    var recordShow = new RecordShow({model: record});

    this.getRecord(elderId, recordId)
    .then(function (data) {
      record.set(data);
      appView.showElderView(recordShow);
    })
    .catch(function (err) {
      record.set(notFound, silentData);
      appView.showElderView(recordShow);
    })
  },

  this.edit = function (elderId, recordId) {
    var record = new Record();
    var recordEdit = new RecordEdit({model: record});

    this.getRecord(elderId, recordId)
    .then(function (data) {
      record.set(data);
      appView.showElderView(recordEdit);
    })
    .catch(function (err) {
      record.set(notFound, silentData);
      appView.showElderView(recordEdit);
    })
  },

  this.list = function (elderId) {
    var records = new Records();
    var recordList = new RecordList({collection: records});
    var url = Backend_url + 'elder/' + elderId + '/records';

    records.updateUrl(url);
    records.fetch(fetchData)
    .done(function () {
      appView.showElderView(recordList);
    })
  },

  this.getRecord = function (elderId, recordId) {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'elder/' + elderId + '/record/' + recordId)
       .done(function (res) {
        if (res.status == 'success') {
          var data = res.data;

          resolve(data);
        }
       })
       .fail(function (err) {
        if (err.status == 404) {
          reject(err);
        }
       })
    })
  }
}


module.exports = RecordCtrl;