var Backbone       = require('backbone');
var $              = require('jquery');
var _              = require('underscore');
var Subroute       = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var ElderList      = require('../view/elderListView');
var Elders         = require('../collection/elders');
var InstanceCtrl   = require('../controller/instanceController');

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
		this.instanceCtrl = new InstanceCtrl();
	},

	homeUser: function () {
		var elders = new Elders();
		var eldersList = new ElderList({collection: elders});

		elders.getFirstPage({fetch: true})
		.done(function () {
			appView.showUserView(eldersList);
		});
	},

	formInst: function () {
		this.instanceCtrl.formInstance();
	}

})