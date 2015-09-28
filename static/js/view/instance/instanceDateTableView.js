var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var InstanceDate = require('./instanceDateRowView');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'instance/templates/instanceDateTable.html',

  initialize: function () {
    this.listenTo(this.collection, 'notInstance', function (message) {
      this.message = message;
    });
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var errorMessage;

      if (!_.isEmpty(this.message)) {
        if (_.isObject(this.message)) {
          util.showError(this.message);

          var message = 'No es posible visitas';
          errorMessage = {message: message};
        } else {
          errorMessage = {message: this.message};
        }
      }

      var html = template(errorMessage);

      this.$el.html(html);

      var totalInstance = this.collection.length;

      if (totalInstance > 0) {
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

















