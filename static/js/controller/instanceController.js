var $ = require('jquery');
var Elder = require('../model/elder');
var InstanceForm = require('../view/instance/instanceNewView');
var Instances = require('../collection/instances');
var InstancesWaiting = require('../view/instance/instanceWatingTableView');
var InstanceDate = require('../view/instance/instanceContentView');

function InstanceCtrl () {
  this.showForm = function () {
    var elder = new Elder();
    var instanceForm = new InstanceForm({model: elder});

    appView.showUserView(instanceForm);
  },

  this.listWaiting = function () {
    var instances = new Instances();
    var instancesWaiting = new InstancesWaiting({collection : instances});

    instances.fetch(fetchData)
    .done(function () {
      appView.showUserView(instancesWaiting);
    })
  },

  this.listForDate = function () {
    var instanceDate = new InstanceDate();

    appView.showUserView(instanceDate);
  }
}

module.exports = InstanceCtrl;