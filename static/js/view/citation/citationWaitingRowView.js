var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');


module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'citation/templates/citationWaitingRow.html',
  events: {
    'click .btn-confirm': 'confirm'
  },

  render: function () {
    this.model.dateFormat();
    this.model.hourStandar();

    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);

    }.bind(this))

    return this;
  },

  confirm: function (e) {
    var target = $(e.target);
    var text = target.text();
    var state;

    if (text == 'Realizada') {
      state = 'confirmed';
    } else {
      state = 'reject';
    }

    this.submitState(state);
  },

  submitState: function (state) {
    var elderId = this.model.get('elder_id');
    var citationId = this.model.get('id');
    var url = 'elder/' + elderId + '/citation/' + citationId + '/check?state=' + state;

    $.get(Backend_url + url)
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        util.showSuccess(successMessage);
        this.close();
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     }.bind(this));
  },

  close: function () {
    this.model.trigger('destroy', this.model);
    this.remove();
  }
})