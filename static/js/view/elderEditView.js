var Backbone   = require('backbone');
var $          = require('jquery');
var Handlebars = require('handlebars');
var util       = require('../util/util');

module.exports = Backbone.View.extend({
  template: Handlebars.compile($('#elderEdit-view').html()),

  events: {
    'submit #formEdit-elder' : 'edit',
    'click .Modal-item' : 'redirect'
  },

  render: function () {
    var data = this.model.toJSON();
    var gender = this.model.get('gender');

    this.$el.html(this.template(data));
    this.$modal = this.$el.find('.Modal');

    var radio = this.$el.find('input[value=' + gender + ']:radio');
    radio.prop('checked', true);
  },

  edit: function (e) {
    e.preventDefault();
    var data = $('#formEdit-elder').serialize();
    
    $.post(Backend_url + 'elder/edit/' + this.model.get('id') + '?_method=PUT', data)
      .done(function (data) {
        if (data.status == 'success') {
          if (data.record == 0) {
            this.message = data.message;
            this.$modal.show();
          } else {
            this.clearElder();
            this.profileElder(id);
            util.showSuccess(data.message);
          }
        } else {
          util.showError(data.message);
        }
      }.bind(this))
      .fail(function (err) {
        util.showError(err);
      });

  },

  redirect: function (e) {
    e.preventDefault();
    e.stopPropagation();

    var target = $(e.target);
    var href = target.attr('href');
    var id = this.model.get('id');

    util.showSuccess(this.message);

    if (href == 'add') {
      window.location.replace('#elder/' + id + '/record/register');
    } else {
       this.clearElder();
       this.profileElder(id);
    }
  },

  clearElder: function () {
    Backbone.Main.Elder.elder.clear();
  },

  profileElder: function (id) {
    Backbone.Main.Elder.navigate('elder/' + id, {trigger: true});
  },

  close: function () {
    this.remove();
  }

});