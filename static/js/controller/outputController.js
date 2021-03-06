var $ = require('jquery');
var Output = require('../model/output');
var Backbone = require('backbone');
var Outputs = require('../collection/outputs');
var OutputConfirm = require('../view/output/outputConfirmView');
var OutputForm = require('../view/output/outputNewView');
var OutputShow = require('../view/output/outputShowView');
var OutputEdit = require('../view/output/outputEditView');
var OutputPernotForm = require('../view/output/outputPernotNewView');
var OutputList = require('../view/output/outputTableView');
var OutputListPernot = require('../view/output/outputPernotTableView');
var OutputShowWaiting = require('../view/output/outputWaitingShowView');
var OutputWaiting = require('../view/output/outputWaitingTableView');

function OutputCtrl () {
  this.showForm = function () {
    var elder = Backbone.Main.Elder.elder;
    var outputForm = new OutputForm({model: elder});

    appView.showElderView(outputForm);
  },

  this.show = function (elderId, outputId) {
    var output = new Output();
    var outputShow = new OutputShow({model: output});

    this.getOutput(elderId, outputId)
    .then(function (data) {
      output.set(data);
      appView.showElderView(outputShow);
    })
    .catch(function (err) {
      output.set(notFound, silentData);
      appView.showElderView(outputShow);
    })
  },


  this.edit = function (elderId, outputId) {
    var output = new Output();
    var outputEdit = new OutputEdit({model:output});

    this.getOutput(elderId, outputId)
    .then(function (data) {
      output.set(data);
      appView.showElderView(outputEdit);
    })
    .catch(function (data) {
      output.set(notFound, silentData);
      appView.showElderView(outputEdit);
    })
  },

  this.showListElder = function (elderId) {
    var output = new Output();
    var outputWatingShow = new  OutputShowWaiting({model: output});

    $.get(Backend_url + 'elder/' + elderId + '/output/pending')
     .done(function (res) {
      if (res.status == 'success') {
        var outputData = res.data
        output.set(outputData);
        appView.showElderView(outputWatingShow);
      }
     })
     .fail(function (err) {
      if (err.status == 404) {
        output.set({elder_id:elderId});
        output.set(notFound, silentData);
        appView.showElderView(outputWatingShow);
      }
     })
  },

  this.showFormPernot = function () {
    var elder = Backbone.Main.Elder.elder;
    var outputPernotForm = new OutputPernotForm({model: elder});

    appView.showElderView(outputPernotForm);
  },

  this.showListCasual = function () {
    var outputs = new Outputs();
    var outputList = new OutputList({collection: outputs});
    
    outputs.getFirstPage(fetchData)
    .done(function () {
      appView.showUserView(outputList);
    });
  },

  this.showListPernot = function () {
    var outputs = new Outputs();
    var outputListPernot = new OutputListPernot({collection:outputs});

    outputs.getFirstPage(fetchData)
    .done(function () {
      appView.showUserView(outputListPernot);
    })
  },


  this.showListWaiting = function () {
    var outputs = new Outputs();
    var outputListWaiting = new OutputWaiting({collection: outputs});

    outputs.getFirstPage(fetchData)
    .done(function () {
      appView.showUserView(outputListWaiting);
    });
  },

  this.showConfirm = function (elderId, outputId) {
    var output = new Output();
    var outputConfirm = new OutputConfirm({model: output});

    this.getOutput(elderId, outputId)
    .then(function (data) {
      output.set(data);
      appView.showUserView(outputConfirm);
    })
    .catch(function (err) {
      output.set(notFound, silentData);
      appView.showUserView(outputConfirm);
    })
  },

  this.getOutput = function (elderId, outputId) {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'elder/' + elderId + '/output/' + outputId)
       .done(function (res) {
        if (res.status == 'success') {
          resolve(res.data);
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

module.exports = OutputCtrl;