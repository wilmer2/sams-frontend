var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlbars = require('handlebars');
var EventView = require('./eventRowView');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'event/templates/eventTable.html',

  initialize: function () {
    this.listenTo(this.collection, 'notEvent', function (message) {
      this.message = message;
    });
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlbars.compile(template);
      var errorMessage;
      
      if (!_.isEmpty(this.message)) {
        if (_.isObject(this.message)) {
          util.showError(this.message);

          var message = 'No es posible encontrar eventos';
          errorMessage = {message: message};
        } else {
          errorMessage = {message: this.message};
        }
      }

      var html = template(errorMessage);

      this.$el.html(html);

      var totalEvent = this.collection.length;

      if (totalEvent > 0) {
        this.$tbody = this
                        .$el
                        .find('table')
                        .children('tbody');

        this.addAll();
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

  close: function () {
    this.remove();
  }


});