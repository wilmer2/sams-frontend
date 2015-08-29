var Backbone   = require('backbone');
var $          = require('jquery');
var Subroute   = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var FormRecord = require('../view/formRecord');

module.exports = Subroute.extend({
  routes: {
    'register' : 'register'
  },

  register: function () {
    var formRecord = new FormRecord();
    appView.showElderView(formRecord);
  }

});