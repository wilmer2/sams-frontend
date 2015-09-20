var Backbone   = require('backbone');
var $          = require('jquery');
var Handlebars = require('handlebars');
var util       = require('../util/util');
var utilHour   = require('../util/utilHour');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: Handlebars.compile($('#assistance-elementEmp').html()),
   events: {
    'click .Table-btnSubmit': 'submit',
    'click .Table-btnEdit': 'edit',
    'click .Table-btnCancel': 'cancel',
  },

  initialize: function () {
    this.model.on('change', this.render, this);
  },

  render: function () {
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);

    this.$hourIn = this.$el.find('.Table-hourIn');
    this.$hourOut = this.$el.find('.Table-hourOut');
    this.$submit = this.$el.find('.u-submit');
    this.$data = this.$el.find('.u-data');

    return this;
  },

  edit: function (e) {
    e.stopPropagation();
    this.$submit.removeClass('u-disabled');
    this.$data.addClass('u-disabled');
  },

  cancel: function (e) {
    e.stopPropagation();

    var hourIn = this.model.get('hour_in');
    var hourOut = this.model.get('hour_out');

    this.$hourIn.val(hourIn);
    this.$hourOut.val(hourOut);
    this.$submit.addClass('u-disabled');
    this.$data.removeClass('u-disabled');
  },

  submit: function (e) {
    e.stopPropagation();

    var formData = new FormData();
    var hourIn = this.$hourIn.val();
    var hourOut = this.$hourOut.val();
    var id = this.model.get('id');
    hourIn = utilHour.hourFormat(hourIn);
    hourOut = utilHour.hourFormat(hourOut);

    formData.append('hour_in', hourIn);
    formData.append('hour_out', hourOut);

    $.ajax({
      url: Backend_url + 'attendances/' + id + '/edit?_method=PUT',
      type: 'POST',
      data: formData,
      processData : false, 
      contentType : false,
    })
    .done(function (res) {
      if (res.status == 'success') {
        this.cancel(e);
        util.showSuccess(res.message);
        this.model.set(res.data);
      } else {
        util.showError(res.message);
      }
    }.bind(this))
  },

})