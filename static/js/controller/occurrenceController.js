var Backbone = require('backbone');
var $ = require('jquery');
var Occurrence = require('../model/occurrence');
var Occurrences = require('../collection/occurrences');
var OccurrenceForm = require('../view/occurrence/occurrenceNewView');
var OccurrenceShow = require('../view/occurrence/occurrenceShowView');
var OccurrenceEdit = require('../view/occurrence/occurrenceEditView');
var OccurrenceList = require('../view/occurrence/occurrenceTableView');

function OccurrenceCtrl () {
  this.showForm = function () {
    var elder = Backbone.Main.Elder.elder;
    var occurrenceForm = new OccurrenceForm({model: elder});

    appView.showElderView(occurrenceForm);
  },

  this.show = function (elderId, occurrenceId) {
    var occurrence = new Occurrence();
    var occurrenceShow = new OccurrenceShow({model: occurrence});

    this.getOccurrence(elderId, occurrenceId)
        .then(function (data) {
          occurrence.set(data);
          appView.showElderView(occurrenceShow);
        })
        .catch(function (err) {
          occurrence.set(notFound, silentData);
          appView.showElderView(occurrenceShow);
        });
  },

  this.edit = function (elderId, occurrenceId) {
    var occurrence = new Occurrence();
    var occurrenceEdit = new OccurrenceEdit({model: occurrence});

    this.getOccurrence(elderId, occurrenceId)
        .then(function (data) {
          occurrence.set(data);
          appView.showElderView(occurrenceEdit);
        })
        .catch(function (err) {
          occurrence.set(notFound, silentData);
          appView.showElderView(occurrenceEdit);
        })
  },

  this.list = function (elderId) {
    var occurrences = new Occurrences();
    var occurrenceList = new OccurrenceList({collection: occurrences});
    var url = Backend_url + 'elder/' + elderId + '/occurrences';

    occurrences.updateUrl(url);
    occurrences.getFirstPage(fetchData)
    .done(function () {
      appView.showElderView(occurrenceList);
    });
  },

  this.getOccurrence = function (elderId, occurrenceId) {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'elder/' + elderId + '/occurrence/' + occurrenceId)
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

module.exports = OccurrenceCtrl;