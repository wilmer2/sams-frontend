var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'instance/templates/instanceEdit.html',
  events: {
    'submit #instance-edit': 'edit'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this));
  },

  edit: function (e) {
    e.preventDefault();

    var elderId = this.model.get('elder_id');
    var instanceId = this.model.get('id');
    var data = $('#instance-edit').serialize();
    var url = 'elder/' + elderId + '/instance/' + instanceId + '/edit?_method=PUT';

    data = this.prepareData(data);

    $.post(Backend_url + url, data)
    .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;

        util.showSuccess(successMessage);

        window.location.replace('#elder/' + elderId + '/instance/' + instanceId);
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
    })

  },

  prepareData: function (data) {
    var identityCard = this.model.get('identity_card');
    var visitDate = this.model.get('visit_date');
    data = data + '&identity_card=' + identityCard + '&visit_date=' + visitDate;

    return data;
  },

  close: function () {
    this.remove();
  }

})