var Backbone = require('backbone');
var Subroute = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var ProductCtrl = require('../controller/productController');

module.exports = Subroute.extend({
  routes: {
    'register': 'register',
    'list': 'list'
  },

  initialize: function () {
    this.productCtrl = new ProductCtrl();
  },

  register: function () {
    this.productCtrl.showForm();
  },

  list: function () {
    this.productCtrl.showList();
  }

})
