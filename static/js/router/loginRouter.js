var Backbone       = require('backbone');
var $              = require('jquery');
var AuthUser       = require('../model/authUser');
var LoginView      = require('../view/loginView');
var MenuUser       = require('../view/menuView');
var HomeRouter     = require('./homeRouter');
var ActivityRouter = require('./ActivityRouter');

var util  = require('../util/util');

module.exports = Backbone.Router.extend({
	routes: {
		'' :     'selectMenu',
		'login': 'login',
		'logout':'logout',
		
		'home/*subroute': 'invokeHomeModule',
		'activity/*subroute': 'invokeActiveModule'

	},

	initialize: function () {
		this.userLogin = new AuthUser();
		this.loginView = new LoginView({model: this.userLogin});
		this.menuView  = new MenuUser({model: this.userLogin});

		Backbone.history.start();
	},

	before: {
		'*any' : 'checkUser',
	},

	checkUser: function (fragment, args, next) {
		$.ajaxSetup({
				xhrFields : {
      		withCredentials : true
    	},
			statusCode: {
				401: function () {
					var hash = window.location.hash;
					Backbone.Main.unSetUser();

					if (hash != Hash_login) {
							window.location.replace('/#login');
					} else {
						next();
					}
				}
			}
		});
		
		if (this.userLogin.has('group')) {
			next();
		} else {
			this.getUser()
				.then(function (data) {
					this.userLogin.set(data);
					return this.getConfiguration();
				}.bind(this))
				.then(function (config) {
					this.userLogin.set(config, {silent: true});
					next();
				}.bind(this))
				.catch(function (err) {
					this.interceptor(err);
				}.bind(util));
		}
	},

	selectMenu: function () {
		var group = this.userLogin.get('group');

		if (group.name == 'User') {
			this.navigate('home/', {trigger: true});
		} else {
			console.log('menu admin');
		}
	},

	login: function () {
		if (this.userLogin.has('group')) {
			this.selectMenu();
		} else {
			  if (!this.userLogin.has('name_institution')) {
			  	 this.getConfiguration()
			  	 	.then(function (config) {       
			  	 	 	this.userLogin.set(config, {silent: true});
             	this.login();
			  	 	}.bind(this))
			  	 	.catch(function (err) {
			  	 		this.interceptor(err);
			  	 	}.bind(util))
			  } else {
					this.loginView.render();
			  }
		}
	},

	getConfiguration: function () {
		return new Promise(function (resolve, reject) {
				$.get(Backend_url + 'configuration')
					.done(function (res) {
						 resolve(res.config);
					})
					.fail(function (err) {
						reject(err);
					})
		})
	},

	getUser: function () {
		return new Promise(function (resolve, reject) {
				$.get(Backend_url + 'user/authenticate')
					.done(function (res) {
							resolve(res.data);
					})
					.fail(function (err) {
							reject(err);
					})
		})
	},

	logout: function () {
		$.get(Backend_url + 'logout')
			.done(function () {
				this.unSetUser();
				this.navigate('login', {trigger: true});
			}.bind(this));
	},

	unSetUser: function () {
		 var defaults = this.userLogin.pick(['viewVisited', 'viewOutputs','viewCitation',
			                                  'before']);
		 this.userLogin.clear({silent: true});
		 this.userLogin.set(defaults, {silent: true});
	},

	renderHeader: function () {
		this.loginView.renderHeader();
	},

	renderMenu: function () {
		this.renderHeader();
		appView.showMain(this.menuView);
	},

	invokeHomeModule: function (subroute) {
		
		if (!Backbone.Main.Home) {
			Backbone.Main.Home = new HomeRouter('home/');
		}
	},

	invokeActiveModule: function (subroute) {
		if (!Backbone.Main.Activity) {
			Backbone.Main.Activity = new ActivityRouter('activity/');
		}
	}
	
});

