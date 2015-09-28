var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlbars = require('handlebars');
var InstanceRow = require('./instanceElderRowView');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'instance/templates/instanceElderTable.html',
  
  initialize: function () {
    this.listenTo(this.collection, 'notInstance', function (message) {
      this.message = message;
    });
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlbars.compile(template);
      var errorMessage = {message: this.message};
      var html = template(errorMessage);

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
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (instance) { 
    var instanceView = new InstanceRow({model: instance});

    this.$tbody.append(instanceView.render().el);
  },

  close: function () {
    this.remove();
  }

  
})