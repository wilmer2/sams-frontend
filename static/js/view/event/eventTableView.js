var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlbars = require('handlebars');
var EventView = require('./eventRowView');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'event/templates/eventTable.html',
  boxError: Handlbars.compile($('#error-event').html()),

  initialize: function () {
    this.listenTo(this.collection, 'notEvent', function (message) {
      this.message = message;
    });
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      if (_.isEmpty(this.message)) {
        var template = template;

        this.$el.html(template);

        this.$tbody = this
                        .$el
                        .find('table')
                        .children('tbody');

        this.addAll();
      } else {
          if (_.isObject(this.message)) {
            var error = 'No es posible encontra eventos';

            util.showError(this.message);
            this.emptyEvents(error);
          } else {
            this.emptyEvents(this.message);
          }
      }
    }.bind(this))
 
  },

  addAll: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (eventModel) {
    eventModel.hourStandar();
    
    var eventView = new EventView({model: eventModel});

    this.$tbody.append(eventView.render().el);
  },

  emptyEvents: function (message) {
    var errorMessage = {message: message};
    var boxError = this.boxError(errorMessage);

    this.$el.html(boxError);
  },

  close: function () {
    this.remove();
  }


});