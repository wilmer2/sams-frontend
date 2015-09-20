var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var alertify = require('alertifyjs');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: Handlebars.compile($('#product-element').html()),
  events: {
    'click .Table-btnEdit': 'edit',
    'click .Table-btnCancel': 'cancel',
    'click .Table-btnSubmit': 'submit',
    'click .Table-btnDelete': 'confirm'
  },

  initialize: function () {
    this.model.on('change', this.render, this);
  },

  render: function () {
    var data = this.model.toJSON();
    var html = this.template(data);

    this.$el.html(html);

    this.$submit = this.$el.find('.u-submit');
    this.$data = this.$el.find('.u-data');
    this.$description = this.$el.find('.Table-description');
    this.$unit = this.$el.find('.Select');
    this.$stock = this.$el.find('.Table-stock');

    return this;
  },

  edit: function (e) {
    e.stopPropagation();
    this.$submit.removeClass('u-disabled');
    this.$data.addClass('u-disabled');
  },

  cancel: function (e) {
    e.stopPropagation();
    
    var description = this.model.get('description');
    var stock = this.model.get('stock');
    var unit = this.model.get('unit');
    

    this.$description.val(description);
    this.$stock.val(stock);
    this.$unit.children('option[value="'  + unit + '"]').attr('selected', 'selected');
    this.$submit.addClass('u-disabled');
    this.$data.removeClass('u-disabled');
  },

  submit: function (e) {
    e.stopPropagation();

    var productId = this.model.get('id');
    var newDescription = this.$description.val();
    var newUnit = this.$unit.children(':selected').val();
    var newStock = this.$stock.val();
    var formData = new FormData();

    formData.append('description', newDescription);
    formData.append('unit', newUnit);
    formData.append('stock', newStock);

    $.ajax({
      url: Backend_url + 'product/' + productId + '/edit?_method=PUT',
      type: 'POST',
      data: formData,
      processData : false, 
      contentType : false,
    })
    .done(function (res) {
      if (res.status == 'success') {
        var data = res.data;
        var successMessage = res.message;
        
        util.showSuccess(successMessage);
        this.model.set(data, triggerData);
      } else {
        var errorMessage = res.message;

        util.showError(errorMessage);
      }
    }.bind(this))
  
  },

  confirm: function (e) {
    e.stopPropagation();

    var title = 'Eliminar producto';
    var message = 'Desea eliminar este producto';
    var callback = function () {
      this.delete();
    }.bind(this);

    alertify.confirm(message, callback)
    .setting({
      'title': title,
      'labels': {
        'ok': 'Confirmar',
        'cancel': 'Cancelar'
      }
    });
  },

  delete: function () {
    var productId = this.model.get('id');

    $.post(Backend_url + 'product/' + productId + '/delete?_method=DELETE')
     .done(function (res) {
      if (res.status == 'success') {
        var deleteMessage = res.message;

        util.showSuccess(deleteMessage);
      }
     })

    this.model.trigger('destroy', this.model);
    this.remove();
  }

});