var Backbone   = require('backbone');
var $          = require('jquery');
var Handlebars = require('handlebars');
var util       = require('../util/util');

module.exports = Backbone.View.extend({
	el:  $('#header-content'),
	section: $('#main-content'),

	template: Handlebars.compile($('#login-view').html()),
	templateSection: $('#initialize-view').html(),
	
	render: function () {
		this.renderHeader();
		this.section.html(this.templateSection);
	},

	renderHeader: function () {
		var data = this.model.toJSON();
		var html = this.template(data);
		this.$el.html(html);
	},

	events: {
		'submit #login' : 'checkIn'
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
	}

});