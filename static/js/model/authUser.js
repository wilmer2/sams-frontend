var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

	defaults: {
		before: 0,
		viewVisited: false,
		viewOutputs: false,
		viewCitation: false
	},

	initialize: function () {
		this.on('change', this.confirmedSuperAdmin);
	},

	confirmedSuperAdmin: function () {
		var group = this.get('group');

		if (group.name == 'SuperAdmin')	{
			this.set({isSuperAdmin: true, hasIconMenu: true}, {silent: true});
		} else if (group.name == 'Admin') {
			this.set({hasIconMenu: false, isSuperAdmin: false}, {silent: true});
		} else {
			this.set({hasIconMenu: true, isSuperAdmin: false}, {silent: true});
		}
		this.confimedCitation();
	},

	confimedCitation: function () {
		var citation         = this.get('citation');
		var before           = this.get('before');
		var citationCurrent  = citation - before;

		this.set({'before': citation}, {silent: true});
		this.set({'citation': citationCurrent}, {silent:true});
	},

});