var Backbone   = require('backbone');
var $          = require('jquery');
var _          = require('underscore');
var Subroute   = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var ListElders = require('../view/elderListView');
var Elders     = require('../collection/elders');

module.exports = Subroute.extend({
	routes: {
		'' : 'homeUser',
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

})