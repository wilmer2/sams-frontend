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
    var dateEnd = this.model.get('date_end');
    var data = $('#formOutput-edit').serialize();

    $.post(Backend_url + url, data)
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;
        var newDataOutput = res.data;

        this.model.set(newDataOutput);

        var state = this.model.get('state');
        var type = this.model.get('type');

        if (!state && type == 'pernot') {
          var newDateEnd = this.model.get('date_end');

          this.confirmDate(newDateEnd, dateEnd);
        }

        util.showSuccess(successMessage);
        window.location.href = '#elder/' + elderId + '/output/' + outputId;
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     }.bind(this))
  },

  confirmDate: function (newDateEnd, dateEnd) {
    var currentDate = util.currentDate();

    if (dateEnd <= currentDate && newDateEnd > currentDate) {
      Backbone.Main.userLogin.resOutput();
    } else if (dateEnd > currentDate && newDateEnd <= currentDate) {
      Backbone.Main.userLogin.addOutput();
    }

    /*if (newDateEnd != dateEnd) {
      if (newDateEnd == currentDate) {
        Backbone.Main.userLogin.addOutput();
      } else {
        if (dateEnd == currentDate) {
          Backbone.Main.userLogin.resOutput();
        }
      }
    }*/
  },

  close: function () {
    this.remove();
  }
})