var Backbone    = require('backbone');
var $           = require('jquery');
var Subroute    = require('../../dependencies/backboneSubroutes/backboneSubroutes');
var ContentView = require('../view/contentActionView');

var util = require('../util/util');


module.exports  = Subroute.extend({
	routes: {
		'' : 'activity'
	},

	activity: function () {
		Backbone.Main.renderMenu();
		var date        = util.currentDate();
		var contentView = new ContentView();
		this.getEvents(date)
		 .then(function (events) {
			  if (events.status == 'success') {
			  	contentView.addEvents(events.data);
			 	}		 	
			 	return this.getActions(date);
		 }.bind(this))
		 .then(function (actions) {
			 	if (actions.status == 'success') {
			 		 contentView.addActions(actions.data);
			 		appView.showUserView(contentView);
			 } else {
			 	  contentView.notActions(actions.message);
			 	  appView.showUserView(contentView);
			 }
		}.bind(this))
	},

	getEvents: function (date) {
		return new Promise(function (resolve, reject) {
			$.get(Backend_url + 'events/' + date)
				.done(function (res) {
					resolve(res);
				})
				.fail(function (err) {
					reject(err);
				})
		})
	},

	getActions: function (date) {
	  return new Promise(function (resolve, reject) {
	  	 $.get(Backend_url + 'actions/'+ date)
	  	 	.done(function (res) {
	  	 		resolve(res);
	  	 	})
	  	 	.fail(function (err) {
	  	 		reject(err);
	  	 	})
	  })
	},

	
})