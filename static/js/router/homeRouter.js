var Backbone     = require('backbone');
var $            = require('jquery');
var _            = require('underscore');
var Subroute     = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var ElderCtrl    = require('../controller/elderController');
var InstanceCtrl = require('../controller/instanceController');

module.exports = Subroute.extend({
	routes: {
		'' : 'homeUser',
		'register/instance': 'formInst',
	},

	before: {
		'*any': 'renderMenu'
	},

	renderMenu: function (fragment, arg, next) {
		Backbone.Main.renderMenu();
		next();
	},

	initialize: function () {
		this.elderCtrl = new ElderCtrl();
		this.instanceCtrl = new InstanceCtrl();
	},

	homeUser: function () {
		this.elderCtrl.showElders();
	},

	formInst: function () {
		this.instanceCtrl.formInstance();
	}

})