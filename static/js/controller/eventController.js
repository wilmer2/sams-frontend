var $ = require('jquery');
var Event = require('../model/event');
var EventForm = require('../view/event/eventNewView');
var EventEdit = require('../view/event/eventEditView');
var EventShow = require('../view/event/eventShowView');
var EventAll = require('../view/event/eventContentView');

function EventCtrl () {
  this.showForm = function () {
    var eventModel = new Event();
    var eventForm = new EventForm({model: eventModel});

    appView.showUserView(eventForm);
  },

  this.show = function (eventId) {
    var eventModel = new Event();
    var eventShow = new EventShow({model: eventModel});

    this.getEvent(eventId)
    .then(function (data) {
      eventModel.set(data);
      appView.showUserView(eventShow);

    })
    .catch(function (err) {
      eventModel.set(notFound, silentData);
      appView.showUserView(eventShow);
    })
  },

  this.edit = function (eventId) {
    var eventModel = new Event();
    var eventEdit = new EventEdit({model:eventModel});

    this.getEvent(eventId)
    .then(function (data) {
      eventModel.set(data);
      appView.showUserView(eventEdit);
    })
    .catch(function (err) {
      eventModel.set(notFound, silentData);
      appView.showUserView(eventEdit);
    })
  },

  this.list = function () {
    var eventAll = new EventAll()
    appView.showUserView(eventAll);
  },

  this.getEvent = function (eventId) {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'occasion/' + eventId)
       .done(function (res) {
        if(res.status == 'success') {
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

module.exports = EventCtrl;