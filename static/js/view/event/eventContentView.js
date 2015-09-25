var Backbone = require('backbone');
var $ = require('jquery');
var Events = require('../../collection/events');
var EventList = require('./eventTableView');
var util = require('../../util/util')

module.exports = Backbone.View.extend({
  template: 'event/templates/eventContent.html',
  events: {
    'submit #date-event': 'getEvents'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = template;
      var currentDate = util.currentDate();

      this.$el.html(template);

      this.$contentEvent = this
                             .$el
                             .find('#content-event');

      this
        .showEvents(currentDate);
    }.bind(this))
  },

  getEvents: function (e) {
    e.preventDefault();

    var date = $('.Search-date').val();
    
    this.showEvents(date);
  },

  showEvents: function (date) {
    var url = Backend_url + 'occasions?date=' + date;
    var events = new Events();
    var eventList = new EventList({collection: events});

    events.updateUrl(url);
    events.fetch(fetchData)
    .done(function () {
      this.renderEvents(eventList);
     }.bind(this))
  },

  renderEvents: function (eventList) {
    if (this.currentList) {
      this.currentList.close();
    }

    this.currentList = eventList;

    this.currentList.render();
    this.$contentEvent.html(this.currentList.el);
  },

  close: function () {
    this.remove();
  }
})