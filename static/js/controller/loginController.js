var $ = require('jquery');
var MenuUser = require('../view/menu/menuUserView');
var MenuAdmin = require('../view/menu/menuAdminView');
var util = require('../util/util');

function LoginCtrl () {
  this.loadUser = function (user, config, next) {
    this.loggedUser()
    .then(function (data) {
      user.set(data);

      return this.loadConfig();
    }.bind(this))
    .then(function (dataConfig) {
      config.set(dataConfig);

      return next();
    })
  },

  this.loggedUser = function () {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'user/logged')
       .done(function (res) {
        if (res.status == 'success') {
          var userData = res.data;

          resolve(userData);
        }
       })
    })
  },

  this.loadConfig = function () {
    return new Promise(function (resolve, reject) {
      $.get(Backend_url + 'config')
       .done(function (res) {
        if (res.status == 'success') {
          var configData = res.data;

          resolve(configData);
        }
       })
    })
  },

  this.menuUserRender = function (user) {
    console.log('sdfsdfsdf');
    var menuUser = new MenuUser({model:user});

    appView.showMenuView(menuUser);
  },

  this.menuAdminRender = function (user) {
    var role = user.get('role');

    if (role == 'User') {
      window.location.href = '#elders'
    } else {
      var menuAdmin = new MenuAdmin({model:user});

      appView.showMenuView(menuAdmin);
    }
  }
}

module.exports = LoginCtrl;