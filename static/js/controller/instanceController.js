var $ = require('jquery');
var Elder = require('../model/elder');
var Instance = require('../model/instance');
var Instances = require('../collection/instances');
var InstanceForm = require('../view/instance/instanceNewView');
var InstanceShow = require('../view/instance/instanceShowView');
var InstaceEdit = require('../view/instance/instanceEditView');
var InstanceShowWaiting = require('../view/instance/instanceWaitingShowView');
var InstancesWaiting = require('../view/instance/instanceWatingTableView');
var InstanceDate = require('../view/instance/instanceContentView');
var InstanceListElder = require('../view/instance/instanceElderTableView')


function InstanceCtrl () {
  this.showForm = function () {
    var elder = new Elder();
    var instanceForm = new InstanceForm({model: elder});

    appView.showUserView(instanceForm);
  },
  
  this.show = function (elderId, instanceId) {
    var instance = new Instance();
    var instanceShow = new InstanceShow({model: instance});

    this.getInstance(elderId, instanceId)
    .then(function (data) {
      instance.set(data);
      appView.showElderView(instanceShow);
    })
    .catch(function (err) {
      instance.set(notFound, silentData);
      appView.showElderView(instanceShow);
    })
  },

  this.edit = function (elderId, instanceId) {
    var instance = new Instance();
    var instanceEdit = new InstaceEdit({model: instance});

    this.getInstance(elderId, instanceId)
    .then(function (data) {
      instance.set(data);
      appView.showElderView(instanceEdit);
    })
    .catch(function (err) {
      instance.set(notFound, silentData);
      appView.showElderView(instanceEdit);
    })
  },

  this.showWaiting = function (elderId) {
    var instance = new Instance();
    var instanceShowWaiting = new InstanceShowWaiting({model:instance});
  
    $.get(Backend_url + 'elder/' + elderId + '/instance/waiting')
     .done(function (res) {
      if (res.status == 'success') {
        instance.set(res.data);
        appView.showElderView(instanceShowWaiting);
      } 
     })
     .fail(function (err) {
       instance.set(notFound, silentData);
       appView.showElderView(instanceShowWaiting);
     })
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
  },

  this.listElder = function (elderId) {
    var instances = new Instances();
    var instanceListELder = new InstanceListElder({collection: instances});
    var url = Backend_url + 'elder/' + elderId + '/instances';
    
    instances.updateUrl(url);

    instances.fetch(fetchData)
    .done(function () {
      appView.showElderView(instanceListELder);
    });
  },

  this.getInstance = function (elderId, instanceId) {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'elder/' + elderId + '/instance/' + instanceId)
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

module.exports = InstanceCtrl;