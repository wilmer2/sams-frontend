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
      var template = Handlebars.compile(template);
      var erroMessage = {message: this.message};
      var html = template(erroMessage);
      
      this.$el.html(html);

      if (_.isEmpty(this.message)) {
        this.$tbody = this
                        .$el
                        .find('table')
                        .children('tbody');

        this.addAll();
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

  close: function () {
    this.remove();
  }


});