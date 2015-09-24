var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
	el:  $('#header-content'),
	template: 'login/templates/login.html',
	templateMain: 'login/templates/main.html',

  events: {
		'submit #login' : 'login',
	},

  initialize: function (opt) {
  	this.$main = $('#main-content');
  	this.config = opt.config;
  },

	render: function () {
		this.renderHeader();
		$.get(rootView + this.templateMain, function (templateMain) {
			this.$main.html(templateMain);
		}.bind(this))
	},

	renderHeader: function () {
		$.get(rootView + this.template, function (template) {
			var template = Handlebars.compile(template);
			var userData = this.model.toJSON();
			var configData = this.config.toJSON();
			var context = {
				user: userData,
				config: configData
			};
			var html = template(context);

			this.$el.html(html);
		}.bind(this))
	},

	login: function (e) {
		e.preventDefault();

		var data = $('#login').serialize();

		$.post(Backend_url + 'user/login', data)
		 .done(function (res) {
		 	if (res.status == 'success') {
		 		var data = res.data;

		 		this.model.set(data);
		 		console.log(this.model.toJSON());
		 		window.location.replace('');
		 	} else {
		 		util.showError(res.message);
		 	}
		 }.bind(this))
		 .fail(function (err) {
		 	util.interceptor(err);
		 })
	}

});