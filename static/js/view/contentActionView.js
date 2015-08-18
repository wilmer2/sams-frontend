var Backbone    = require('backbone');
var $           = require('jquery');
var Handlebars  = require('handlebars');
var Actions     = require('../collection/actions');
var Events      = require('../collection/events');
var ActionsView = require('./actionListView');

var util = require('../util/util');

module.exports = Backbone.View.extend({
	template   : $('#contentActions-view').html(),
	templateErr : Handlebars.compile($('#error-view').html()),

	events: {
		'submit #formDateAction' : 'actionForDate'
	},

	initialize: function () {
		this.$el.html(this.template);

		this.eventContent  = this.$el.children('#content-events');
		this.actionContent = this.$el.children('#content-actions');

		this.events        = new Events();
		this.actions       = new Actions();
		this.eventsView    = new ActionsView({collection: this.events});
		this.actionsView   = new ActionsView({collection:this.actions});
	},

	addEvents: function (data) {
		var title = 'Eventos';
  
		this.eventsView.addTable(title);
		this.events.reset(data);
		this.eventContent.append(this.eventsView.el);
		this.eventContent.addClass('u-blue');
	},

	addActions: function (data) {
		var title = 'Actividades Diarias';

		this.actionsView.addTable(title);
		this.actions.reset(data);
		this.showAction(title);
	},

	notActions: function (message) {
		 var title = 'Sin Activades';

		 this.actionsView.addTable(title); 
		 this.showAction();
		 util.showError(message);
	},

	showAction: function (title) {
		this.actionContent.append(this.actionsView.el);
		this.actionContent.addClass('u-red');
	},

	actionForDate: function (e) {
		e.preventDefault();
		var getEvents  = Backbone.Main.Activity.getEvents;
		var getActions = Backbone.Main.Activity.getActions;

		var date = $('#actionDate').val();
		var hasEvents = true;

		getEvents(date)
			.then(function (events) {
				 this.eventContent.empty();
					if (events.status == 'success') {
						this.addEvents(events.data);
					} else {
						 hasEvents = false;
					}
					return getActions(date);
			}.bind(this))
			.then(function (actions) {
				 this.actionContent.empty();
				  if (actions.status == 'success') {
				 		this.addActions(actions.data);
				  } else {
				 	 	if (!hasEvents) this.notActions(actions.message);
				  }
			}.bind(this))
			.catch(function (err) {
				 this.checkErr(err);
			}.bind(util))
	},

	close: function () {
		this.remove();
	},


});
