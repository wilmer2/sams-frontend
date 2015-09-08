var $               = require('jquery');
var Instance        = require('../model/instance');
var InstaceForm     = require('../view/formInstanceView');
var InstanceWaiting = require('../view/instanceWaitingView');

function instanceCtrl () {
  this.formInstance = function () {
    var instaceForm = new InstaceForm();

    appView.showUserView(instaceForm);
  },

  this.showWaiting = function (elderId) {
    var instance = this.getInstance();
    var instWaiting = new InstanceWaiting({model: instance});

    this.getWaiting(elderId)
    .then(function (res) {
      if (res.status == 'success') {
        var instanceData = res.instance;

        instance.set(instanceData);
        appView.showElderView(instWaiting);
      }
    })
    .catch(function (err) {
      if (err.status == 404) {
        instance.set(notFound, silentData);
        appView.showElderView(instWaiting);
      }
    })
  },

  this.getWaiting = function (elderId) {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'waiting/notifications/' + elderId)
       .done(function (res) {
          resolve(res);
       })
       .fail(function (err) {
          reject(err);
       })
    });
  },

  this.getInstance = function () {
    return new Instance();
  }
}

module.exports = instanceCtrl;