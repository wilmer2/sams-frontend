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

	addCitation: function () {
		var citationAdd = this.get('citation');
		citationAdd = citationAdd  + 1;

		this.set('citation', citationAdd);
	},

	addInstance: function () {
		var instanceAdd = this.get('instance');
		instanceAdd =  instanceAdd + 1;

		this.set('instance', instanceAdd);
	},

	addOutput: function () {
		var outputAdd = this.get('output');
		outputAdd = outputAdd + 1;

		this.set('output', outputAdd);
	},

	resCitation: function () {
		var citationRes = this.get('citation');

		if (citationRes > 0) {
			citationRes = citationRes - 1;
		}

		this.set('citation', citationRes);
	},

	resOutput: function () {
		var outputRes = this.get('output');


		if (outputRes > 0) {
			outputRes = outputRes - 1;
		}

		this.set('output', outputRes);
	},

	resInstance: function () {
		var instanceRes = this.get('instance');


		if (instanceRes > 0) {
			instanceRes = instanceRes - 1;
		}

		this.set('instance', instanceRes);
	}


});