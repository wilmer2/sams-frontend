var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlbars = require('handlebars');
var InstanceDate = require('./instanceDateRowView');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'instance/templates/instanceDateTable.html',
  boxError: Handlbars.compile($('#error-instance').html()),

  initialize: function () {
    this.listenTo(this.collection, 'notInstance', function (message) {
      this.message = message;
    });
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = template;

      if (_.isEmpty(this.message)) {
        this.$el.html(template);

        this.$tbody = this.$el.find('table').children('tbody');

        this.addAll();
      } else {
        if (_.isObject(this.message)) {
          var error = 'No es posible encontrar Visitas';

          util.showError(this.message);
          this.emptyInstance(error);
        } else {
          this.emptyInstance(this.message);
        }
      }
    }.bind(this))
   
  },

  addAll: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (instance) {
    instance.referenceFormat();
    instance.dateFormat();
    instance.stateFormat();

    var instanceDate = new InstanceDate({model: instance});

    this.$tbody.append(instanceDate.render().el);
  },

  emptyInstance: function (message) {
    var errorMessage = {message: message};
    var boxError = this.boxError(errorMessage);

    this.$el.html(boxError);
  },

  close: function () {
    this.remove();
  }


});

















