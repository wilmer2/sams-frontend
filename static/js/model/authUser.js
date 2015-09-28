var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

	initialize: function () {
		this.on('change', this.stateRole);
	},

	stateRole: function () {
		var role = this.get('role');
		var isAdmin = {Admin: true};
		var notAdmin = {Admin: false};

		if (role == 'User') {
			this.set(notAdmin, silentData);
		} else {
			this.set(isAdmin, silentData);
		}
		
	},


});