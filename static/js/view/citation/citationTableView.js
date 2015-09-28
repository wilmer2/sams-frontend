var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var CitationView = require('./citationTableRowView');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'citation/templates/citationTable.html',

  initialize: function () {
    this.collection.on('destroy', this.countCitation, this);

    this.listenTo(this.collection, 'notCitation', function (message) {
      this.message = message;
    });
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
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

  addOne: function (citation) {
    var citationView = new CitationView({model: citation});

    this.$tbody.append(citationView.render().el);
  },

  countCitation: function () {
    var countCitation = this.collection.length;

    if (countCitation == 0) {
      this.message = 'No hay citas para este momento';

      this.render();
    }
  },

  close: function () {
    this.remove();
  }
})