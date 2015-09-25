var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var CitationView = require('./citationWaitingRowView');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'citation/templates/citationWaitingTable.html',
  className: 'citationWaitingTableView',
  boxError: Handlebars.compile($('#error-citation').html()),

  initialize: function () {
    this.collection.on('destroy', this.countCitation, this);

    this.listenTo(this.collection, 'notCitation', function (message) {
      this.message = message;
    });
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      if (_.isEmpty(this.message)) {
        this.$el.html(template);

        this.$tbody = this.$el.find('table').children('tbody');

        this.addAll();
      } else {
        this.emptyCitation(this.message);
      }

    }.bind(this))
  },

  addAll: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (citation) {
    var citationView = new CitationView({model: citation});

    this.$tbody.append(citationView.render().el);
  },

  countCitation: function () {
    var countCitation = this.collection.length;

    if (countCitation == 0) {
      var message = 'Adulto mayor no tiene citas pendientes';

      this.emptyCitation(message);
    }
  },

  emptyCitation: function (message) {
    var errorMessage = {message: message};
    var boxError = this.boxError(errorMessage);

    this.$el.html(boxError);
  },

  close: function () {
    this.remove();
  }

  
})