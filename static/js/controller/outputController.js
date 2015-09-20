var $ = require('jquery');
var Output = require('../model/output');
var Outputs = require('../collection/outputs');
var OutputConfirm = require('../view/output/outputConfirmView');
var OutputList = require('../view/output/outputTableView');
var OutputListPernot = require('../view/output/outputPernotTableView');
var OutputWaiting = require('../view/output/OutputWaitingTableView');

function OutputCtrl () {
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
        if (res.status == 404) {
          reject(err);
        }
       })
    })
  }
}

module.exports = OutputCtrl;