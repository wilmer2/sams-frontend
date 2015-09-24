var Backbone = require('backbone');
var $ = require('jquery');
var Citation = require('../model/citation');
var Citations = require('../collection/citations');
var CitationsElder = require('../collection/citationsElder');
var CitationShow = require('../view/citation/citationShowView');
var CitationEdit = require('../view/citation/citationEditView');
var CitationForm = require('../view/citation/citationNewView');
var CitationList = require('../view/citation/citationElderTableView');
var CitationWaiting = require('../view/citation/citationWaitingTableView');

function CitationCtrl() {
  this.showForm = function () {
    var elder = Backbone.Main.Elder.elder;
    var citationForm = new CitationForm({model: elder});

    appView.showElderView(citationForm);
  },

  this.show = function (elderId, citationId) {
    var citation = new Citation();
    var citationShow = new CitationShow({model: citation});

    this.getCitation(elderId, citationId)
    .then(function (data) {
      citation.set(data);
      appView.showElderView(citationShow);
    })
    .catch(function (err) {
      citation.set(notFound, silentData);
      appView.showElderView(citationShow);
    })
  },

  this.edit = function (elderId, citationId) {
    var citation = new Citation();
    var citationEdit = new CitationEdit({model: citation});

    this.getCitation(elderId, citationId)
    .then(function (data) {
      citation.set(data);
      appView.showElderView(citationEdit);
    })
    .catch(function (err) {
      citation.set(notFound, silentData);
      appView.showElderView(citationEdit);
    })
  },

  this.list = function (elderId) {
    var citations = new CitationsElder();
    var citationList = new CitationList({collection: citations});
    var url = Backend_url + 'elder/' + elderId + '/citations';

    citations.updateUrl(url);
    citations.getFirstPage(fetchData)
    .done(function () {
      appView.showElderView(citationList);
    })
  },

  this.listWaiting = function (elderId) {
    var citations = new Citations();
    var citationWaiting = new CitationWaiting({collection: citations});
    var url = Backend_url + 'elder/' + elderId + '/citations/waiting';

    citations.updateUrl(url);
    citations.fetch(fetchData)
    .done(function () {
      appView.showElderView(citationWaiting);
    })
  },

  this.getCitation = function (elderId, citationId) {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'elder/' + elderId + '/citation/' + citationId)
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

module.exports = CitationCtrl;