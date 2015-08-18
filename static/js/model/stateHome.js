var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	 initialize: function () {
	 	 this.on('change:stateElder', this.checkElder, this);
	 	 this.on('change:stateActon', this.checkAction, this);
	 },

	 checkElder: function () {
	 		var state = this.get('stateElder');

	 		if (state == 'success') {
	 				this.set({notElder: false});
	 		} else {
	 				this.set({notElder: true});
	 		}
	 },

	 checkAction: function () {
	 		var state = this.get('stateAction');

	 		if (state == 'success') {
	 			 this.set({viewAction : true});
	 		} else {
	 			this.set({viewAction: false});
	 		}
	 }
});