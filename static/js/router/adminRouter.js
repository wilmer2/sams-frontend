var Backbone     = require('backbone');
var $            = require('jquery');
var Subroute     = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var MenuAdmin    = require('../view/menuAdminView');
var FormEmployee = require('../view/formEmployee');


module.exports = Subroute.extend({
  routes: {
    'register/employee' : 'registerEmp',
  },

  initialize: function () {
    this.menuAdmin = new MenuAdmin();
  },

  before: {
    '*any' : 'hasPermit',
  },

  hasPermit: function (fragment, args, next) {
    var user = Backbone.Main.userLogin;
    var group = user.get('group');

    if (group.name == 'User') {
      Backbone.Main.navigate('', {trigger: true});
    } else {
      Backbone.Main.renderHeader();
      this.menuAdmin.render();
      next();
    }
   
  },
  
  registerEmp: function () {
    var formEmployee = new FormEmployee();
    appView.showAdminView(formEmployee);
  },

})