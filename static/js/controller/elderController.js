var $ = require('jquery');
var Elder = require('../model/elder');
var Elders = require('../collection/elders');
var ElderShow = require('../view/elder/elderShowView');
var ElderEdit = require('../view/elder/elderEditView');
var ElderList = require('../view/elder/elderTableView');
var ElderNotResident = require('../view/elder/elderNotResidentTableView');

function ElderCtrl () {
  this.show = function (elder) {
    var elderShow = new ElderShow({model:elder});

    appView.showElderView(elderShow);
  },

  this.edit = function (elder) {
    var elderEdit = new ElderEdit({model: elder});

    appView.showElderView(elderEdit);
  },

  this.list = function () {
    var elders = new Elders();
    var elderList = new ElderList({collection: elders});

    elders.getFirstPage(fetchData)
    .done(function () {
      appView.showUserView(elderList);
    })
  },

  this.listNotResident = function () {
    var elders = new Elders();
    var elderNotResident = new ElderNotResident({collection: elders});

    elders.getFirstPage(fetchData)
    .done(function () {
      appView.showUserView(elderNotResident);
    })
  }
/*  this.showElder = function (elder) {
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
  },*/

  this.getElder = function (elderId) {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'elder/' + elderId)
       .done(function (res) {
        if (res.status == 'success') {
          var data = res.data;

          resolve(data);
        }
       })
       .fail(function (err) {
        reject(err);
       })
    })
  }
}

module.exports = ElderCtrl;