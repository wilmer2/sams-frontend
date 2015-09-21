var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var Schedules = require('../../collection/schedules');
var ActionItemHour = require('./actionItemHourView');

module.exports = Backbone.View.extend({
  template: Handlebars.compile($('#data-action').html()),
  boxError: Handlebars.compile($('#error-actionHour').html()),
  events: {
    'click .btn-edit': 'redirectEdit',
    'click .btn-addHour': 'redirectAddHour'
  },

  initialize: function () {
    this.schedules = new Schedules();

    this.schedules.on('destroy', this.countSchedule, this);

    this.listenTo(this.schedules, 'notSchedule', function (message) {
      this.message = message;
    });

  },

  render: function () {
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);

    this.$contentHours = this.$el.find('#action-content');

    this.showHours();
  },

  showHours: function () {
    var actionId = this.model.get('id');
    var schedules = this.schedules;
    var url = Backend_url + 'action/' + actionId +'/schedules';

    schedules.updateUrl(url);
    schedules.fetch(triggerData)
    .done(function () {
      this.addAll();
    }.bind(this));
  },

  addAll: function () {
    var count = this.schedules.length;

    if (count > 0) {
      this.schedules.forEach(this.addOne, this);
    } else {
      this.emptySchedule(this.message);
    }
  },

  addOne: function (schedule) {
    schedule.formatDays();
    schedule.hourStandar();

    var action = this.model;
    var itemData = {model:schedule, action: action}
    var actionItemHour = new ActionItemHour(itemData);

    this.$contentHours
    .children('#action-listHour')
    .append(actionItemHour.render().el);
  },

  countSchedule: function () {
    console.log('test');
    var countSchedule = this.schedules.length;

    if (countSchedule == 0) {
      var message = 'Actividad no posee horarios';

      this.emptySchedule(message);
    }
  },

  emptySchedule: function (message) {
    var errorMessage = {message: message};
    var boxError = this.boxError(errorMessage);

    this.$contentHours.html(boxError);
  },

  redirectEdit: function () {
    var actionId = this.model.get('id');

    Backbone.Main.navigate('action/' + actionId + '/edit', triggerData);
  },

  redirectAddHour: function () {
    var actionId = this.model.get('id');

    Backbone.Main.navigate('action/' + actionId + '/schedule', triggerData);
  },

  close: function () {
    this.remove();
  }
})