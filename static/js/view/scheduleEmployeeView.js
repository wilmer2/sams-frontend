var Backbone   = require('backbone');
var $          = require('jquery');
var Handlebars = require('handlebars');
var util       = require('../util/util');

module.exports = Backbone.View.extend({
  template: Handlebars.compile($('#scheduleEmp-data').html()),

  render: function () {
    var notFound = this.model.get('notFound');
 
    if (!notFound) {
      var days = this.model.get('days');
      days = util.selectDays(days);

      this.model.set({days: days}, {silent: true});
    }
    
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);
  },

  close: function () {
    this.remove();
  }
})