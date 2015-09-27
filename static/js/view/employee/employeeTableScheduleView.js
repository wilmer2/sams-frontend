var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var ScheduleItem = require('./employeeTableScheduleRowView');

module.exports = Backbone.View.extend({
  template: 'employee/templates/employeeTableSchedule.html',

  initialize: function () {
    this.collection.on('destroy', this.scheduleDestroy, this);
    this.listenTo(this.collection, 'notSchedule', function (message) {
      this.message = message;
    });
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var errorMessage = {message: this.message};
      var html = template(errorMessage);

      this.$el.html(html);

      if (_.isEmpty(this.message)) {
        this.$tbody = this
                      .$el
                      .find('table')
                      .children('tbody')

        this.addAll();
      } 
    }.bind(this))
  },

  addAll: function () {
    this.collection
        .forEach(this.addOne, this);
  },

  addOne: function (schedule) {
    var employee = Backbone.Main.Employee.employee;
    var modelData = {model: schedule, employee: employee};
    var scheduleItem = new ScheduleItem(modelData);

    this
      .$tbody
      .append(scheduleItem.render().el);
  },

  scheduleDestroy: function () {
    var totalSchedule = this.collection.length;

    if (totalSchedule == 0) {
      this.message = 'Empleado no tiene horarios asignados';
      this.render();
    }
  },

  close: function () {
    this.remove();
  }
})


