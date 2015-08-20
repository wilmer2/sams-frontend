var Backbone        = require('backbone');
var $               = require('jquery');
var Handlebars      = require('handlebars');
var util            = require('../util/util');

module.exports = Backbone.View.extend({
	el:  $('#header-content'),
	section: $('#main-content'),
	template: Handlebars.compile($('#login-view').html()),
	templateSection: $('#initialize-view').html(),

  events: {
		'submit #login'        : 'checkIn',
		'click .MenuItem-icon' : 'viewNotifi',
	},

	render: function () {
		this.renderHeader();
		this.section.html(this.templateSection);
	},

	renderHeader: function () {
		var data = this.model.toJSON();
		var html = this.template(data);

		this.$el.html(html);
	},

	checkIn: function (e) {
		 e.preventDefault();
		 var data = $('#login').serialize();

		 $.post(Backend_url + 'login', data)
		 		.done(function (res) {
		 			 if (res.status == 'success') {
		 			 		Backbone.Main.userLogin.set(res.data);
		 			 		Backbone.Main.selectMenu();
		 			 } else {
		 			 	  util.showError(res.message);
		 			 }
		 		})
		 		.fail(function (err) {
		 			util.interceptor(err);
		 		})
	},

	viewNotifi: function (e) {
		e.preventDefault();
		e.stopPropagation();

		var icon = $(e.target);
		var href = icon.attr('href');

		if (href == 'visited') {
			 this.model.set({viewVisited: true},{silent: true});
		} else if (href == 'outputs') {
			 this.model.set({viewOutputs: true}, {silent: true});
		} else {
			this.model.set({viewCitation: true}, {silent: true});
    	Backbone.Main.citNotify.show();
		}

		this.renderHeader();
	},


});