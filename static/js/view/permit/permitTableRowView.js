var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'permit/templates/permitTableRow.html',
  events: {
    'click #btn-permitShow': 'redirectShow',
  },

  render: function () {
    this.model.dateFormat();
    
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this));

    return this;
  },

  redirectShow: function () {
    var employeeId = this.model.get('employee_id');
    var permitId = this.model.get('id');

    window.location.href = '#employee/' + employeeId +'/permit/' + permitId;
  }

})