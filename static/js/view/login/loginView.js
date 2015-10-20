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
		'click #logout': 'logout'
	},


  initialize: function (opt) {
  	this.$main = $('#main-content');
  	this.config = opt.config;

  	this.config.on('change', this.renderHeader, this);
  	this.model.on('change:citation change:instance change:output', this.renderHeader, this);
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
		 		window.location.replace('');
		 	} else {
		 		util.showError(res.message);
		 	}
		 }.bind(this))
		 .fail(function (err) {
		 	util.interceptor(err);
		 })
	},

	logout: function (e) {
		e.preventDefault();

		$.get(Backend_url + 'user/logout')
		 .done(function (res) {
		 	Backbone.Main
		 	         .config
		 	          .clear();
			Backbone.Main
			          .userLogin
			          .clear();
			Backbone.Main
			         .navigate('login', triggerData);
		})
	}

});