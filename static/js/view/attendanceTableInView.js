var Backbone       = require('backbone');
var $              = require('jquery');
var _              = require('underscore');
var PaginateView   = require('./paginationView');
var AssistanceView = require('./attendanceElementInView');
var util           = require('../util/util');

module.exports = Backbone.View.extend({
  template: $('#assistance-tableIn').html(),
  events: {
    'keyup .Search': 'serch'
  },

  initialize: function () {
    var collectionData = {collection: this.collection};
    this.paginateView = new PaginateView(collectionData);

    this.collection.on('goTo', this.changePage, this);
    this.collection.on('destroy', this.countAssitance, this);
    this.updateUrl();
  },

  render: function () {
    this.$el.html(this.template);
    this.getPaginateView();

    this.$tbody = this.$el.find('table').children('tbody');

    this.addAll();
  },

  addAll: function () {
    this.collection.forEach(this.addOne, this);
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

  addOne: function (assistance) {
    var assistanceView = new AssistanceView({model: assistance});

    this.$tbody.append(assistanceView.render().el);
  },
  
  changePage: function () {
    this.emptyList();
    this.getPaginateView();
    this.addAll();
  },

  getPaginateView: function () {
    this.$el.prepend(this.paginateView.render().el);
  },

  countAssitance: function () {
    var countAssitance = this.collection.length;

    if (countAssitance == 0) {
      var message = {message: 'No hay asistencias en este momento'};

      this.emptyAssistance(message);
    }
  },

  updateUrl: function () {
    var date = util.currentDate();
    var sooner = 0;
    var url = Backend_url + 'attendances?date=' + date + '&sooner=' + sooner;

    this.collection.updateUrl(url);
  },

  emptyList: function () {
    this.$tbody.empty()
  },

  close: function () {
    this.remove();
  }

})