var Backbone   = require('backbone');
var $          = require('jquery');
var Handlebars = require('handlebars');
var util       = require('../util/util');

module.exports = Backbone.View.extend({
  template: Handlebars.compile($('#instance-waiting').html()),
  events: {
    'click .Modal-config' : 'showConfirm',
    'click .Modal-reject' : 'showReject',
    'click .Modal-item' : 'selectState',
  },

  render: function () {
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);
    
    this.$confirmModal = this.$el.find('#modal-instanceConfirm');
    this.$rejectModal = this.$el.find('#modal-instanceReject')
    this.$modal = this.$el.find('.Modal');
  },

  showConfirm: function () {
   this.$confirmModal.show();
  },

  showReject: function () {
    this.$rejectModal.show();
  },

  closeModal: function () {
    this.$modal.hide();
  },

  selectState: function (e) {
    e.preventDefault();

    var state = $(e.target).attr('href');

    if (state == 'cancel') {
      this.closeModal();
    } else {
      this.confirmInst(state);
    }
  },

  confirmInst: function (state) {
    var id = this.model.get('id');
    var elderId = this.model.get('elder_id');
    var url = '';

    $.get(Backend_url + 'instance/' + id + '/confirmed?state=' + state)
     .done(function (res) {
        if (res.status == 'success') {
          url = '#elder/' + elderId + '/edit';

          this.redirect(url, res.message);
        } else {
          url = '#elder/' + elderId;
          
          this.redirect(url, res.message);
        }
     }.bind(this))
  },

  redirect: function (url, message) {
    this.closeModal();
    util.showSuccess(message);
    Backbone.Main.Elder.elder.clear();
    window.location.replace(url);
  },

  close: function () {
    this.remove();
  }

});