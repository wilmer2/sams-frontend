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

  before: {
    '*any': 'loadMenu'
  },

  loadMenu: function (fragment, args, next) {
    Backbone.Main
             .renderMenuUser()
             .then(next);
  },


  register: function () {
    this.productCtrl.showForm();
  },

  list: function () {
    this.productCtrl.showList();
  }

})
