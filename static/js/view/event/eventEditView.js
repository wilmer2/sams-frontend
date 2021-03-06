var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var util = require('../../util/util');
var utilHour = require('../../util/utilHour');

module.exports = Backbone.View.extend({
  template: 'event/templates/eventEdit.html',
  events: {
    'submit #form-eventEdit': 'edit',
    'click .btn-config': 'toggle'
  },

  render: function () {

    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);

      this.$data = this
                     .$el
                     .find('.u-data');
    }.bind(this))

  },

  edit: function (e) {
    e.preventDefault();

    var eventId = this.model.get('id');
    var formData = new FormData($('#form-eventEdit')[0]);
   
    var times = $('input[type="time"]');

    _.each(times, function (time) {
      var time = $(time);
      var name = time.attr('name');
      var hour = time.val();

      if (_.isEmpty(hour)) {
        formData.append(name, '');
      } else {
        var hourFormat = utilHour.hourFormat(hour);
    
        formData.append(name, hourFormat);
      }
    });

    $.ajax({
      url: Backend_url + 'occasion/' + eventId + '/edit?_method=PUT',
      type: 'POST',
      data: formData,
      processData : false, 
      contentType : false
    })
    .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        util.showSuccess(successMessage);
        window.location.replace('#event/'+ eventId);
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
    });
  },

  toggle: function () {
    this.$data.toggleClass('u-disabled');
    $('#eventEdit_date_end').val('');
  },

  close: function () {
    this.remove();
  }

})