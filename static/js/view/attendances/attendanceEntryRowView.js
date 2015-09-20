var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: Handlebars.compile($('#assistance-elementIn').html()),
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
  
    var attendanceId = this.model.get('id');
    var employeeId = this.model.get('employee_id');
    var state = 1;

    $.get(Backend_url + 'employee/' + employeeId +  '/attendance/'  + attendanceId  + '/confirmed?state=' + state)
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        util.showSuccess(successMessage);
        this.close();
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     }.bind(this))
  },

  close: function () {
    this.model.trigger('destroy', this.model);
    this.remove();
  }
});