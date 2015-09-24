var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var InstanceWaiting = require('./instanceWaitingRowView');

module.exports = Backbone.View.extend({
  template: 'instance/templates/instanceWaitingTable.html',
  boxError: Handlebars.compile($('#error-instance').html()),
   events: {
    'keyup .Search': 'serch'
  },

  initialize: function () {
    this.listenTo(this.collection, 'notInstance', function (message) {
      this.message = message;
    });

    this.updateUrl();
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = template;

      if (_.isEmpty(this.message)) {
        this.$el.html(template);

        this.$tbody = this.$el.find('table').children('tbody');

        this.addAll();
      } else {
        this.emptyInstance(this.message);
      }
    }.bind(this))
  },

  addAll: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (instance) {
    instance.referenceFormat();
    instance.dateFormat();
    
    var instanceView = new InstanceWaiting({model: instance});

    this.$tbody.append(instanceView.render().el);
  },

  updateUrl: function () {
    var url = Backend_url + 'instances/waiting';

    this.collection.updateUrl(url);
  },

  serch: function () {
    var letters = $('.Search').val();
    var filter = this.collection.search(letters);

    if (_.isUndefined(filter)) {
      this.firstPage();
    } else {
      this.emptyList();

      filter.forEach(this.addOne, this);
    }
  },

  firstPage: function () {
    this.collection.fetch(fetchData)
    .done(function () {
      this.emptyList();
      this.addAll();
    }.bind(this))
  },

  emptyList: function () {
    this.$tbody.empty()
  },

  emptyInstance: function (message) {
    var errorMessage = {message: message};
    var boxError = this.boxError(errorMessage);

    this.$el.html(boxError);
  },

  close: function () {
    this.remove();
  }

})