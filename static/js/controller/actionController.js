var $ = require('jquery');
var Action = require('../model/action');
var Actions = require('../collection/actions');
var ActionsToday = require('../collection/actionsToday');
var ActionForm = require('../view/action/actionNewView');
var ActionShow = require('../view/action/actionShowView');
var ActionEdit = require('../view/action/actionEditView');
var ActionSchedule = require('../view/action/actionScheduleView');
var ActionList = require('../view/action/actionTableView');
var ActionTodayList = require('../view/action/actionTodayTableView');

function ActionCtrl () {
  this.showForm = function () {
    var action = new Action();
    var actionForm = new ActionForm({model: action});

    appView.showUserView(actionForm);
  },

  this.show = function (actionId) {
    var action = new Action();
    var actionShow = new ActionShow({model: action});

    this.getAction(actionId)
    .then(function (data) {
      action.set(data);
      appView.showUserView(actionShow);
    })
    .catch(function (err) {
      action.set(notFound, silentData);
      appView.showUserView(actionShow);
    })
  },

  this.edit = function (actionId) {
    var action = new Action();
    var actionEdit = new ActionEdit({model: action});

    this.getAction(actionId)
    .then(function (data) {
      action.set(data);
      appView.showUserView(actionEdit);
    })
    .catch(function (err) {
      action.set(notFound, silentData);
      appView.showUserView(actionEdit);
    })
  },

  this.list = function () {
    var actions = new Actions();
    var actionList = new ActionList({collection: actions});

    actions.getFirstPage(fetchData)
    .done(function () {
      appView.showUserView(actionList);
    })
  },

  this.today = function () {
    var actionsToday = new ActionsToday();
    var actionsTodayList = new ActionTodayList({collection: actionsToday});

    actionsToday.fetch(fetchData)
    .done(function () {
      appView.showUserView(actionsTodayList);
    })
  },

  this.showSchedule = function (actionId) {
    var action = new Action();
    var actionSchedule = new ActionSchedule({model: action});

    this.getAction(actionId)
    .then(function (data) {
      action.set(data);
      appView.showUserView(actionSchedule);
    })
    .catch(function (err) {
      action.set(notFound, silentData);
      appView.showUserView(actionSchedule);
    })
  },

  this.getAction = function (actionId) {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'action/' + actionId)
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

module.exports = ActionCtrl;