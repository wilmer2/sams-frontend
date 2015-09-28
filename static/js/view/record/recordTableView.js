var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var RecordRow = require('./recordRowView');

module.exports = Backbone.View.extend({
  template: 'record/templates/recordTable.html',

  initialize: function () {
    this.listenTo(this.collection, 'notRecord', function (message) {
      this.message = message;
    })
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var errorMessage = {message: this.message};
      var html = template(errorMessage);

      this.$el.html(html);
      
      if (_.isEmpty(this.message)) {
        this.$tbody = this.$el
                          .find('table')
                          .children('tbody');
        this.addAll();
      }

    }.bind(this))
  },

  addAll: function () {
    this.collection
        .forEach(this.addOne, this);
  },

  addOne: function (record) {
    var recordView = new RecordRow({model: record});

    this.$tbody.append(recordView.render().el);
  },

  close: function () {
    this.remove();
  }
});