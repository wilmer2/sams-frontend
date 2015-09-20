var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

	initialize: function () {
		this.on('change', this.stateRole);
	},

	stateRole: function () {
		var role = this.get('role');
		var superAdmin = {isSuperAdmin: true};
		var notSuperAdmin = {isSuperAdmin: false};

		if (role == 'SuperAdmin') {
			this.set(superAdmin, silentData);
		} else {
			this.set(notSuperAdmin, silentData);
		}
		
	},


});