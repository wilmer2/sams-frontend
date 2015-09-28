var Backbone = require('backbone');
var $ = require('jquery');
var Instances = require('../../collection/instances');
var InstaceList = require('./instanceDateTableView');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'instance/templates/instanceContent.html',
  events: {
    'submit #date-instance': 'getInstances'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var currentDate = util.currentDate();
      var template = template;

      this.$el.html(template);

      this.$contentInstance = this
                                .$el
                                .find('#content-instance');

      this.showInstance(currentDate);

    }.bind(this))
   
  },

  getInstances: function (e) {
    e.preventDefault();

    var date = $('.Search-date').val();
    
    this.showInstance(date);
  },

  showInstance: function (date) {
    var url = Backend_url + 'instances?date=' + date;
    var instances = new Instances();
    var instanceList = new InstaceList({collection: instances});

    instances.updateUrl(url);
    instances.fetch(fetchData)
    .done(function () {
      this.renderInstances(instanceList);
     }.bind(this))
  },

  renderInstances: function (instanceList) {
    if (this.currentList) {
      this.currentList.close();
    }

    this.currentList = instanceList;

    this.currentList.render();
    this.$contentInstance.html(this.currentList.el);
  },

  close: function () {
    this.remove();
  }
})