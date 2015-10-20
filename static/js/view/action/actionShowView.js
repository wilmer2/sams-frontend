var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var Schedules = require('../../collection/schedules');
var ActionScheduleRow = require('./actionShowRowView');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'action/templates/actionShow.html',
  events: {
    'click .btn-edit': 'redirectEdit',
    'click .btn-delete': 'confirmDelete',
    'click .btn-addHour': 'redirectAddHour'
  },

  initialize: function () {
    this.schedules = new Schedules();

    this.schedules.on('destroy', this.destroySchedule, this);

    this.listenTo(this.schedules, 'notSchedule', function (message) {
      this.message = message;
    });

  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var actionId = this.model.get('id');
      var url = Backend_url + 'action/' + actionId + '/schedules';

      this
        .schedules
        .updateUrl(url);

      this
        .schedules
        .fetch(triggerData)
        .done(function () {
          if (!_.isEmpty(this.message)) {
            this.model.set('message' , this.message, silentData);
          }

          var data = this.model.toJSON();
          var html = template(data);

          this.$el.html(html);

          if (!this.model.has('message')) {
            this.$tbody = this
                            .$el
                            .find('table')
                            .children('tbody');
            this.addAll();
          }
        }.bind(this))

    }.bind(this))
  },

  addAll: function () {
    this
      .schedules
      .forEach(this.addOne, this);
  },

  addOne: function (schedule) {
    schedule.formatDays();
    schedule.hourStandar();

    var action = this.model;
    var scheduleData = {model:schedule, action: action}
    var scheduleRow = new ActionScheduleRow(scheduleData);

    this.$tbody
         .append(scheduleRow.render().el);
  },

  destroySchedule: function () {
    var totalSchedule = this.schedules.length;

    if (totalSchedule == 0) {
      this.render();
    }
  },

  redirectEdit: function () {
    var actionId = this.model.get('id');

    Backbone.Main.navigate('action/' + actionId + '/edit', triggerData);
  },

  redirectAddHour: function () {
    var actionId = this.model.get('id');

    Backbone.Main.navigate('action/' + actionId + '/schedule', triggerData);
  },

  confirmDelete: function () {
    var title = 'Eliminar Actividad';
    var message = 'Esta seguro de eliminar actividad';
    var callback = function () {
      this.delete();
    }.bind(this);

    alertify.confirm(message, callback)
    .setting({
      'title': title,
      'labels': {
        'ok': 'Confirmar',
        'cancel': 'Cancelar'
      }
    });
  },

  delete: function () {
    var actionId = this.model.get('id');
    
    $.post(Backend_url + 'action/' + actionId + '/delete?_method=DELETE')
     .done(function (res) {
      if (res.status == 'success') {
        var deleteMessage = res.message;

        util.showSuccess(deleteMessage);
        window.location.replace('#action/list');
      }
     })
  },

  close: function () {
    this.remove();
  }
})