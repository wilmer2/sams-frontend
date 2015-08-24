var Backbone    = require('backbone');
var $           = require('jquery');
var RouterMain  = require('./router/loginRouter');
var Handlebars  = require('handlebars');
var AppView     = require('./util/appView');
var Helpers     = require('./util/helper');
var Filter      = require('../../node_modules/backbone-async-route-filters/backbone-async-route-filter');

Backbone.$ = $;

$(function () {


	window.Backend_url = 'http://localhost/';
	window.Hash_login  = '#login';
	window.helper      = new Helpers();
	window.appView     = new AppView();

	Backbone.Main = new RouterMain();


});
