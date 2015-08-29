var Backbone   = require('backbone');
var $          = require('jquery');
var Handlebars = require('handlebars');
var util       = require('../util/util');

module.exports = Backbone.View.extend({
  template: Handlebars.compile($('#instance-data').html()),

  events: {
    'click #confirm-show'   : 'showConfirm',
    'click #confirm-cancel' : 'closeConfirm',
    'click #reject-show'    : 'showReject',
    'click #reject-cancel'  : 'closeReject',
    'click .Modal-item'     : 'confirmInstance',
  },

  render: function () {
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);
  },

  showConfirm: function () {
    this.$el.find('#modal-instanceConfirm').removeClass('u-disabled');
  },

  showReject: function () {
    this.$el.find('#modal-instanceReject').removeClass('u-disabled');
  },
  
  closeConfirm: function () {
    this.$el.find('#modal-instanceConfirm').addClass('u-disabled');
  },

  closeReject:function () {
    this.$el.find('#modal-instanceReject').addClass('u-disabled');  
  },

  confirmInstance: function (e) {
    e.preventDefault();
    e.stopPropagation();

    var target = $(e.target);
    var data   = target.attr('href');

    data = data.split('/');

    var id = data[0];
    var state = data[1];
    var url;

    $.get(Backend_url + 'confirmed/notifications/' +id + '?state=' + state)
      .done(function (res) {
        if (res.status == 'info') {
            util.showSuccess(res.message);
            this.closeReject();
            url = '#elder/' + id;
        } else {
          util.showSuccess(res.message);
          this.closeConfirm();
          url = '#elder/' + id + '/edit';
        }
        
        Backbone.Main.Elder.elder.clear();
        window.location.replace(url);
      }.bind(this))
  },

  close: function () {
    this.remove();
  }

});