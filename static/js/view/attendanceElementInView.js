var Backbone   = require('backbone');
var $          = require('jquery');
var Handlebars = require('handlebars');
var util       = require('../util/util');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: Handlebars.compile($('#assitance-elementIn').html()),
  events: {
    'click .Table-confirm': 'confirm'
  },

  render: function () {
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);

    return this;
  },

  confirm: function (e) {
    e.stopPropagation();

    var id = this.model.get('id');

    $.get(Backend_url + 'attendances/' + id + '/confirmed')
     .done(function (res) {
      if (res.status == 'success') {
        util.showSuccess(res.message);
        this.close();
      }
     }.bind(this))
  },

  close: function () {
    this.model.destroy();
    this.remove();
  }
});