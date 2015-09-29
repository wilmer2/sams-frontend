var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');


module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'citation/templates/citationWaitingRow.html',
  events: {
    'click #citationConfirm': 'confirm',
    'click #citationCancel': 'reject'
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

  confirm: function () {
    var confirmedState = 'confirmed';
    
    this.submitState(confirmedState);
  },

  reject: function () {
    var confirmedReject = 'reject';

    this.submitState(confirmedReject);
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
        Backbone.Main.Elder.elder.clear();
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