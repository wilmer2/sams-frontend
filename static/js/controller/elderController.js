var Backbone = require('backbone');
var $ = require('jquery');
var Elder = require('../model/elder');
var Elders = require('../collection/elders');
var ElderShow = require('../view/elder/elderShowView');
var ElderEdit = require('../view/elder/elderEditView');
var ElderList = require('../view/elder/elderListTableView');
var ElderNotResident = require('../view/elder/elderNotResidentListTableView');

function ElderCtrl () {
  this.show = function (elder) {
    var user = Backbone.Main.userLogin;

    var elderShow = new ElderShow({model:elder, user: user});

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