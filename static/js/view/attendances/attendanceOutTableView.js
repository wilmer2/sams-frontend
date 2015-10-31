var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var PaginateView = require('../paginate/paginationView');
var AssistanceOutView = require('./attendanceOutRowView');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'attendances/templates/attendanceOutTable.html',
  events: {
    'keyup .Search': 'serch'
  },

  initialize: function () {
    var collectionData = {collection: this.collection};
    this.paginateView = new PaginateView(collectionData);
    this.message = '';

    this.collection.on('goTo', this.changePage, this);
    this.collection.on('destroy', this.countAssitance, this);
    this.listenTo(this.collection, 'notAttendance', function (message) {
      this.message = message;
    })

    this.updateUrl();
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var errorMessage = {message: this.message};
      var html = template(errorMessage);

      this.$el.html(html);

      if (_.isEmpty(this.message)) {
        this.getPaginateView();

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

  addOne: function (assistance) {
    var assistanceOutView = new AssistanceOutView({model: assistance});

    this.$tbody.append(assistanceOutView.render().el);
  },

  serch: function () {
    var letters = $('.Search').val();
    var filter = this.collection.search(letters);

    if (_.isUndefined(filter)) {
      this.firstPage();
    } else {
      this.emptyList();
      this.getPaginateView();
      
      filter.forEach(this.addOne, this);
    }
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
    this.$el.append(this.paginateView.render().el);
  },

  countAssitance: function () {
    var countAssitance = this.collection.length;

    if (countAssitance == 0) {
      this.message = 'No hay salidas por confirmar en este momento';

      this.render();
    }
  },

  updateUrl: function () {
    var date = util.currentDate();
    var url = Backend_url + 'attendances/waiting?date=' + date;

    this.collection.updateUrl(url);
  },

  emptyList: function () {
    this.$tbody.empty()
  },

  close: function () {
    this.paginateView.close();
    this.remove();
  }


})