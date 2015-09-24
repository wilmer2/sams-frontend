var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util')

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'output/template/outputWaitingRow.html',
  events: {
    'click .Table-btnConfirm': 'confirm'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);

    }.bind(this))

    return this;
  },

  confirm: function () {
    var elderId = this.model.get('elder_id');
    var outputId = this.model.get('id');

    $.get(Backend_url + 'elder/' + elderId + '/output/' + outputId + '/confirm')
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        this.model.trigger('check');
        util.showSuccess(successMessage);
        
        window.location.href = '#output/' + outputId + '/elder/' + elderId + '/confirm';
        
      }
     }.bind(this))
  }
})