var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var ActionToday = require('./actionTodayRowView');

module.exports = Backbone.View.extend({
  template: 'action/templates/actionTodayTable.html',
  boxError: Handlebars.compile($('#error-action').html()),

  initialize: function () {  
    this.listenTo(this.collection, 'notAction', function (message) {
      this.message = message;
    });
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      if (_.isEmpty(this.message)) {
        var template = template;

        this.$el.html(template);
        this.$tbody = this.$el.find('table').children('tbody');

        this.addAll();
      } else {
        this.emptyAction(this.message);
      }
    }.bind(this))
    
  },

  addAll: function () {
    var sortByActions = this.collection.sortBy(function (action) {
      return action.get('hour_in');
    });

    sortByActions.forEach(this.addOne, this);
  },

  addOne: function (action) {
    action.hourStandar();

   var actionToday = new ActionToday({model: action});

    this.$tbody.append(actionToday.render().el);
  },

  emptyAction: function (message) {
    var erroMessage = {message: message};
    var boxError = this.boxError(erroMessage);

    this.$el.html(boxError);
  },

  close: function () {
    this.remove();
  }


});