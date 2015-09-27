var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var PaginateView = require('../paginate/paginationView');
var PermitView = require('./permitTableRowView');

module.exports = Backbone.View.extend({
  template: 'permit/templates/permitTable.html',

  initialize: function () {
    var collectionData = {collection: this.collection};
    this.paginateView = new PaginateView(collectionData);

    this.collection.on('destroy', this.permitDestroy, this);
    this.listenTo(this.collection, 'notPermit', function (message) {
      this.message = message;
    });
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var errorMessage = {message:this.message};
      var html = template(errorMessage);

      this.$el.html(html);
      this.getPaginateView();

      if (_.isEmpty(this.message)) {
        this.$tbody =  this
                         .$el
                         .find('table')
                         .children('tbody');
        this.addAll();
      }
    }.bind(this))
  },

  addAll: function () {
    var sortByPermit = this
                        .collection
                        .sortBy(function (permit) {
                          return permit.get('date_start');
                        });
    sortByPermit
     .forEach(this.addOne, this);
  },

  addOne: function (permit) {
    var permitView = new PermitView({model:permit});

    this
      .$tbody
      .append(permitView.render().el);
  },

  firstPage: function () {
    this.collection.getFirstPage(fetchData)
    .done(function () {
      this.paginateView.pagInit();
      this.changePage();
    }.bind(this))
  },

  changePage: function () {
    this.emptyList();
    this.getPaginateView();
    this.addAll();
  },

  getPaginateView: function () {
    this
      .$el
      .append(this.paginateView.render().el);
  },

  permitDestroy: function () {
    var totalPermit = this.collection.length;

    if (totalPermit == 0) {
      this.message = 'Empleado no tiene registro de permisos';
      this.render();
    }
  },

  emptyList: function () {
    this
      .$tbody
      .empty();
  },

  close: function () {
    this.paginateView.close();
    this.remove();
  }

})

