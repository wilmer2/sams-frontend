var $ = require('jquery');
var MenuUser = require('../view/menu/menuUserView');
var util = require('../util/util');

function LoginCtrl () {
  this.loadUser = function (user, next) {
    this.loggedUser()
    .then(function (data) {
      user.set(data);

      return next();
    });
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
    var userModel = {model: user};
    var menuUser = new MenuUser(userModel);

    appView.showMenuView(menuUser);
  }
}

module.exports = LoginCtrl;