var Backbone = require('backbone');
var $ = require('jquery');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'event/templates/eventNew.html',
  events: {
    'submit #form-event': 'register',
    'click .btn-config': 'toggle'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = template;

      this.$el.html(template);

      this.$data = this.$el.find('.u-data');
    }.bind(this))
  },

  register: function (e) {
    e.preventDefault();

    var data = $('#form-event').serialize();

    $.post(Backend_url + 'occasion', data)
     .done(function (res) {
      if (res.status == 'success') {
        this.model.set(res.data);
        util.showSuccess(res.message);

        var eventId = this.model.get('id');

        Backbone.Main.navigate('event/' + eventId, triggerData);
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     }.bind(this))
  },

  toggle: function () {
    this.$data.toggleClass('u-disabled');
    $('#event_dateEnd').val('');
  },

  close: function () {
    this.remove();
  }

});