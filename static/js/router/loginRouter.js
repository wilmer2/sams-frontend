var Backbone = require('backbone');
var $ = require('jquery');
var AuthUser = require('../model/authUser');
var Config = require('../model/config');
var LoginView = require('../view/login/loginView');
var LoginCtrl = require('../controller/loginController');
var ElderCtrl = require('../controller/elderController');
// var Citations       = require('../collection/citations');
// var CitationsNotify = require('../view/citationNotifyView');
// var LoginView       = require('../view/loginView');
// var MenuUser        = require('../view/menuView');
// var MenuAdmin       = require('../view/menuAdminView');
// var HomeRouter      = require('./homeRouter');
// var ElderRouter     = require('./elderRouter');
// var AdminRouter     = require('./adminRouter');
// var EmployeeRouter  = require('./employeeRouter');
var InstanceRouter = require('./instanceRouter');
var ActionRouter = require('./actionRouter');
var EventRouter = require('./eventRouter');
var OutputRouter = require('./outputRouter');
var AttendanceRouter = require('./attendanceRouter');
var ProductRouter = require('./productRouter');

var util  = require('../util/util');

module.exports = Backbone.Router.extend({
	routes: {
		'' :     'selectMenu',
		'login': 'login',
		'elders': 'elders',
		'elders/notResident': 'eldersNotResident',
		// 'logout':'logout',
		
		// 'home/*subroute': 'invokeHomeModule',
		// 'admin/*subroute': 'invokeAdminModule',
		// 'elder/*subroute': 'invokeElderModule',
		// 'employee/*subroute': 'invokeEmployeeModule',
		'action/*subroute': 'invokeActionModule',
		'instance/*subroute': 'invokeInstanceModule',
		'attendance/*subroute': 'invokeAttendanceModule',
		'product/*subroute': 'invokeProductModule',
		'event/*subroute': 'invokeEventModule',
		'output/*subroute': 'invokeOutputModule'
	},

	initialize: function () {
		this.userLogin = new AuthUser();
		this.config = new Config();
		this.loginCtrl = new LoginCtrl();
		this.elderCtrl = new ElderCtrl();

		var loginData = {model: this.userLogin, config: this.config};
		
		this.loginView = new LoginView(loginData);
		/*this.menuView  = new MenuUser({model: this.userLogin});
		this.menuAdmin = new MenuAdmin({model: this.userLogin});
		this.citations = new Citations();
		this.citNotify = new CitationsNotify({collection: this.citations});*/

		Backbone.history.start();
	},

	before: {
		'*any' : 'checkUser',
	},

	checkUser: function (fragment, args, next) {
		var user = this.userLogin;
		var config = this.config;

		$.ajaxSetup({
			xhrFields: {
      	withCredentials: true
    	},
    	statusCode: {
    		401: function () {
     			var hash = window.location.hash;
        	
        	if (hash != Hash_login) {
          		window.location.replace('/#login');
          } else {
            return next();
          }
      	}
    	}
    });

    if (user.has('role')) {
    	next();
    } else {
    	this.loginCtrl.loadUser(user, config, next);
    }
		
	},

	login: function () {
		if (this.userLogin.has('role')) {
			this.selectMenu();
		} else {
			if (!this.config.has('name_institution')) {
				this.loginCtrl.loadConfig()
				.then(function (data) {
					this.config.set(data);
					this.login();
				}.bind(this))
			} else {
				this.loginView.render();
			}
		}
	},

	selectMenu: function () {
		var role = this.userLogin.get('role');

		// if (role == 'User') {
			this.navigate('elders', triggerData);
		// } else {
		// 	console.log('test');
		// }
	},

	renderHeader: function () {
		this.loginView.renderHeader();
	},

	renderMenuUser: function () {
		this.renderHeader();
		this.loginCtrl.menuUserRender(this.userLogin);
	},

	elders: function () {
		this.renderMenuUser();
		this.elderCtrl.list();
	},

	eldersNotResident: function () {
		this.renderMenuUser();
		this.elderCtrl.listNotResident();
	},
/*
	closeNotify: function () {
		this.citNotify.hideList();
	},

	selectMenu: function () {
		var group = this.userLogin.get('group');

		if (group.name == 'User') {
			this.navigate('home/', {trigger: true});
		} else {
			this.navigate('admin/', {trigger: true});
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
					this.closeNotify();  	
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
		  var defaults = this.userLogin.pick(['viewVisited', 'viewOutputs',
		  	                                  'viewCitation', 'before']);
		 this.userLogin.clear({silent: true});
		 this.userLogin.set(defaults, {silent: true});
	},

	renderHeader: function () {
		this.closeNotify();
		this.loginView.renderHeader();
	},

	renderAdmin: function () {
		this.renderHeader();
		this.menuAdmin.render();
	},

	renderMenu: function () {
		this.renderHeader();
		this.menuView.render();
	},

	invokeHomeModule: function (subroute) {
		
		if (!Backbone.Main.Home) {
			Backbone.Main.Home = new HomeRouter('home/');
		}
	},

	invokeAdminModule: function (subroute) {
		if (!Backbone.Main.Admin) {
			Backbone.Main.Admin = new AdminRouter('admin/');
		}
	},

	invokeActiveModule: function (subroute) {
		if (!Backbone.Main.Activity) {
			Backbone.Main.Activity = new ActivityRouter('activity/');
		}
	},

	invokeElderModule: function (subroute) {
		if (!Backbone.Main.Elder) {
			Backbone.Main.Elder = new ElderRouter('elder/');
		}
	},

	invokeEmployeeModule: function (subroute) {
		if (!Backbone.Main.Employee) {
			Backbone.Main.Employee = new EmployeeRouter('employee/');
		}
	},*/

  invokeInstanceModule: function (subroute) {
  	this.renderMenuUser();

  	if (!Backbone.Main.Instance) {
  		Backbone.Main.Instance = new InstanceRouter('instance/')
  	}
  },

	invokeActionModule: function (subroute) {
		this.renderMenuUser();

		if (!Backbone.Main.Action) {
			Backbone.Main.Action = new ActionRouter('action/');
		}
	},

	invokeOutputModule: function (subroute) {
		this.renderMenuUser();

		if (!Backbone.Main.Output) {
			Backbone.Main.Output = new OutputRouter('output/');
		}
	},

	invokeAttendanceModule: function (subroute) {
		this.renderMenuUser();

		if (!Backbone.Main.Attendance) {
			Backbone.Main.Attendance = new AttendanceRouter('attendance/');
		}
	},

	invokeEventModule: function (subroute) {
		this.renderMenuUser();

		if (!Backbone.Main.Event) {
			Backbone.Main.Event = new EventRouter('event/');
		}
	},

	invokeProductModule: function (subroute) {
		this.renderMenuUser();

		if (!Backbone.Main.Product) {
			Backbone.Main.Product = new ProductRouter('product/');
		}
	}
	
});

