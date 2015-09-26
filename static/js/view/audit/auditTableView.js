var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var PaginateView = require('../paginate/paginationView');
var AuditView = require('./auditRowView');

module.exports = Backbone.View.extend({
  template: 'audit/templates/auditTable.html',
  boxError: 'audit/templates/auditError.html',

  initialize: function () {
    var collectionData = {collection: this.collection};
    this.paginateView = new PaginateView(collectionData);

    this.collection.on('goTo', this.changePage, this);
    
    this.listenTo(this.collection, 'notAudit', function (message) {
      this.message = message;
    });
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      if (_.isEmpty(this.message)) {
        var template = template;

        this.$el.html(template);
        this.getPaginateView();

        this.$tbody = this
                        .$el
                        .find('table')
                        .children('tbody');

        this.addAll()
      } else {
        this.emptyAudit(this.message);
      }
    }.bind(this))
  },

  addAll: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (audit) {
    console.log(audit.toJSON())
    var auditView = new AuditView({model: audit});

    this.$tbody.append(auditView.render().el);
  },

  changePage: function () {
    this.emptyList();
    this.getPaginateView();
    this.addAll();
  },

  getPaginateView: function () {
    this.$el.prepend(this.paginateView.render().el);
  },

  firstPage: function () {
    this.collection.getFirstPage(fetchData)
    .done(function () {
      this.paginateView.pagInit();
      this.changePage();
    }.bind(this))
  },

  emptyAudit: function (message) {
    $.get(rootView + this.boxError, function (template) {
      var template = Handlebars.compile(template);
      var errorMessage = {message: message};
      var html = template(errorMessage);

      this.$el.html(html);

    }.bind(this))
  },

  close: function () {
    this.remove();
  }
})

