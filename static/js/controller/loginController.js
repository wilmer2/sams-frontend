var $ = require('jquery');
var MenuUser = require('../view/menu/menuUserView');
var Configuration = require('../view/configuration/configurationEditView');
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

  this.editConfigurations = function (config) {
    var configurations = new Configuration({model:config});

    appView.showUserView(configurations);
  },

  this.menuUserRender = function (user) {
    return new Promise(function (resolve, reject) {
      var menuUser = new MenuUser ({model: user});

      appView
        .showMenuView(menuUser)
        .then(resolve);
    }.bind(this))
  }
}

module.exports = LoginCtrl;