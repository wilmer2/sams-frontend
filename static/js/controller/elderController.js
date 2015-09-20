var $          = require('jquery');
var Elders     = require('../collection/elders');
var ElderTable = require('../view/elderTableView');
var ElderData  = require('../view/elderDataView');
var ElderEdit  = require('../view/elderEditView');

function ElderCtrl () {
  this.showElder = function (elder) {
    var instance = elder.get('instance');  

    if (instance > 0) {
      window.location.replace('#elder/' + elder.get('id') + '/instance-waiting');
    } else {
      var elderView = new ElderData({model:elder});

      appView.showElderView(elderView);
    }
  },

  this.showElders = function () {
    var elders = new Elders();
    var eldersTable = new ElderTable({collection: elders});

    elders.getFirstPage(fetchData)
    .done(function () {
      appView.showUserView(eldersTable);
    })
  },

  this.showEdit = function (elder) {
    var editView = new ElderEdit({model: elder});

    appView.showElderView(editView);
  },

  this.getElder = function (id) {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'elder/' + id)
       .done(function (data) {
        resolve(data);
       })
       .fail(function (err) {
        reject(err);
       })
    });
  }
}

module.exports = ElderCtrl;