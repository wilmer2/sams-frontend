var Backbone = require('backbone');
var $ = require('jquery');
var AuthUser = require('../model/authUser');
var Config = require('../model/config');
var LoginView = require('../view/login/loginView');
var LoginCtrl = require('../controller/loginController');
var ElderCtrl = require('../controller/elderController');
var EmployeeCtrl = require('../controller/employeeController');
var AttendanceCtrl = require('../controller/attendanceController');
var AuditCtrl = require('../controller/auditController');
var CitationCtrl = require('../controller/citationController');
var EmployeeRouter  = require('./employeeRouter');
var ElderRouter = require('./elderRouter');
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
		'employees': 'employees',
		'register': 'register',
		'attendance-date': 'attendanceDate',
		'elders/notResident': 'eldersNotResident',
		'citations': 'citations',
		'audit': 'audit',
		'config': 'config',
		'notFound': 'notFound',
		'employee/*subroute': 'invokeEmployeeModule',
		'elder/*subroute': 'invokeElderModule',
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
		this.citationCtrl = new CitationCtrl();
		this.employeeCtrl = new EmployeeCtrl();
		this.auditCtrl = new AuditCtrl();
		this.attendanceCtrl = new AttendanceCtrl();

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
    console.log(this.userLogin.toJSON());
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
		this.navigate('elders', triggerData);
	},

	renderHeader: function () {
		this.loginView.renderHeader();
	},

	renderMenuUser: function () {
		return new Promise(function (resolve, reject) {
			this.renderHeader();
			this
			  .loginCtrl
			  .menuUserRender(this.userLogin)
			  .then(resolve)
		}.bind(this))
	},

	renderMenuAdmin: function () {
		return new Promise(function (resolve, reject) {
			this.renderHeader();
			this
				.loginCtrl
				.menuUserRender(this.userLogin)
				.then(resolve) 
		}.bind(this));
	},

	elders: function () {
		this.renderMenuUser()
		  .then(function () {
				this.elderCtrl.list();
		  }.bind(this))
	},

	eldersNotResident: function () {
		this.renderMenuUser()
		  .then(function () {
				this.elderCtrl.listNotResident(); 	
		  }.bind(this))
	},

	employees: function () {
		this
		  .renderMenuUser()
		  .then(function () {
				this.employeeCtrl.showList();
		  }.bind(this))
	},

	audit: function () {
		this
		  .renderMenuUser()
		  .then(function () {
		  	this.auditCtrl.getList();
		  }.bind(this))
	},

	register: function () {
		this
			.renderMenuUser()
			.then(function () {
				this.employeeCtrl.showForm();
			}.bind(this))
	},

	attendanceDate: function () {
		this
		  .renderMenuUser()
		  .then(function () {
		  	this.attendanceCtrl.dateAttendance();
		  }.bind(this))
	},

	citations: function () {
		this
		  .renderMenuUser()
		  .then(function () {
		    this.citationCtrl.currentDay();
		  }.bind(this))
	},

	config: function () {
		this
		  .renderMenuUser()
		  .then(function () {
		  	this.loginCtrl.editConfigurations(this.config);
		  }.bind(this))
	},

	notFound: function () {
		this.renderHeader();
		appView.showNotFound();
	},
	
	invokeEmployeeModule: function (subroute) {
		if (!Backbone.Main.Employee) {
			Backbone.Main.Employee = new EmployeeRouter('employee/');
		}
	},

	invokeElderModule: function (subroute) {
		if (!Backbone.Main.Elder) {
			Backbone.Main.Elder = new ElderRouter('elder/');
		}
	},

  invokeInstanceModule: function (subroute) {
  	if (!Backbone.Main.Instance) {
  	  Backbone.Main.Instance = new InstanceRouter('instance/')
  	}
  },

  invokeEventModule: function (subroute) {
		this.renderMenuUser()
		  .then(function () {
		  	if (!Backbone.Main.Event) {
					Backbone.Main.Event = new EventRouter('event/');
				}
		  })

		
	},

	invokeActionModule: function (subroute) {
		this.renderMenuUser()
		  .then(function () {
		  	if (!Backbone.Main.Action) {
					Backbone.Main.Action = new ActionRouter('action/');
				}
		  })
	},

	invokeProductModule: function (subroute) {
		this.renderMenuUser()
		  .then(function () {  	     
				if (!Backbone.Main.Product) {
					Backbone.Main.Product = new ProductRouter('product/');
				}
		  })

	},

	invokeOutputModule: function (subroute) {
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

	
	
});

