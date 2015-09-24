var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var RecordRow = require('./recordRowView');

module.exports = Backbone.View.extend({
  template: 'record/templates/recordTable.html',
  boxError: Handlebars.compile($('#error-record').html()),

  initialize: function () {
    this.listenTo(this.collection, 'notRecord', function (message) {
      this.message = message;
    })
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      if (_.isEmpty(this.message)) {
        var template = template;

        this.$el.html(template);

        this.$tbody = this.$el
                          .find('table')
                          .children('tbody');
        this.addAll();
      } else {
        this.emptyRecord(this.message);
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

  emptyRecord: function (message) {
    var errorMessage = {message: message};
    var boxError = this.boxError(errorMessage);

    this.$el.html(boxError);
  },

  close: function () {
    this.remove();
  }
});