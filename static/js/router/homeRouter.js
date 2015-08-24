var Backbone    = require('backbone');
var $           = require('jquery');
var _           = require('underscore');
var Subroute    = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var ListElders  = require('../view/elderListView');
var FormInstace = require('../view/formInstanceView');
var Elders      = require('../collection/elders');

module.exports = Subroute.extend({
	routes: {
		'' : 'homeUser',
		'register/instance': 'registerInst'
	},

	initialize: function () {
		this.formInstance = new FormInstace();
	},

	homeUser: function () {
		this.elders     = new Elders();
		this.eldersList = new ListElders({collection: this.elders});
		Backbone.Main.renderMenu();
		this.elders.getFirstPage({ fetch: true })
		  .done(function () {
				 appView.showUserView(this.eldersList);
			}.bind(this));
	},

	registerInst: function () {
		Backbone.Main.renderMenu();
		appView.showUserView(this.formInstance);
	}

})