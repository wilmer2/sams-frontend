var Backbone        = require('backbone');
var $               = require('jquery');
var _               = require('underscore');
var CitationElement = require('./citationElementView');

module.exports = Backbone.View.extend({
  el: $('#content-notify'),

  events : {
    'scroll' : 'getData'
  },

  initialize: function () {
    $('body').on('click', function () {
        this.hideList();
    }.bind(this));
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (citation) {
     var element = new CitationElement({model: citation});
     this.$el.append(element.render().el);
  },

  show: function () {
    this.$el.show();
    this.getFirst();
  },

  hideList: function () {
    this.$el.hide();
  },

  getFirst: function () {
    this.collection.getFirstPage({ fetch: true })
      .done(function () {
        this.$el.empty();
        this.render();
      }.bind(this))
  },

  getData: function (e) {
     var target     = $(e.target);
     var height     = target.height();
     var scrollSize = target[0].scrollHeight
     var scrollTop  = target.scrollTop();

     var sizeCurrent = scrollSize - scrollTop;

     if (sizeCurrent == height) {
        this.collection.getNextPage();
        this.render();
     }

  }

});