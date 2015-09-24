var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'elder/templates/elderEdit.html',
  events: {
    'submit #formEdit-elder': 'edit',
    'click .Modal-item': 'confirmed'
  },

  render: function () {
    this.model.dateFormat();

    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);

      this.$modal = this.$el.find('.Modal');
      var gender = this.model.get('gender');
      var radio = this.$el.find('input[value=' + gender + ']:radio');
      
      radio.prop('checked', true);

    }.bind(this))
  },

  edit: function (e) {
    e.preventDefault();

    var elderId = this.model.get('id');
    var data = $('#formEdit-elder').serialize();

    $.post(Backend_url + 'elder/' + elderId + '/edit?_method=PUT', data)
     .done(function (res) {
      if (res.status == 'success') {
        var successMessage = res.message;
        var record = res.record;
        var data = res.data;

        this.model.set(data);
        util.showSuccess(successMessage);

        if (record == 0 && this.model.get('activiti')) {
          this.$modal.show();
        } else {
          this.redirectShow();
        }
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
     }.bind(this))

  },

  confirmed: function (e) {
    var item = $(e.target);
    var text = item.text();
    var elderId = this.model.get('id');

    if (text == 'Confirmar') {
      window.location.href = '#elder/' + elderId + '/record/register';
    } else {
      this.redirectShow();
    }
  },

  redirectShow: function () {
    var elderId = this.model.get('id');

    this.clearElder();
    window.location.replace('#elder/' + elderId);
  },

  clearElder: function () {
    Backbone.Main.Elder.elder.clear();
  },

  close: function () {
    this.remove();
  }
})
