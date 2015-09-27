var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'output/templates/outputEdit.html',
  events: {
    'submit #formOutput-edit': 'edit'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON()
      var html = template(data);

      this.$el.html(html);

    }.bind(this))
  },

  edit: function (e) {
    e.preventDefault();

    var elderId = this.model.get('elder_id');
    var outputId = this.model.get('id');
    var url = 'elder/' + elderId + '/output/' + outputId + '/edit?_method=PUT';
    var data = $('#formOutput-edit').serialize();

    console.log(data);

    $.post(Backend_url + url, data)
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        util.showSuccess(successMessage);
        window.location.href = '#elder/' + elderId + '/output/' + outputId;
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     })
  },

  close: function () {
    this.remove();
  }
})