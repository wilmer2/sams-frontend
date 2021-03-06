var Backbone = require('backbone');
var _ = require('underscore');
window._ = _;
window.Backbone = Backbone;
var $ = require('jquery');
window.jQuery = $;
var Bootstrap = require('bootstrap');
var RouterMain = require('./router/loginRouter');
var Handlebars = require('handlebars');
var AppView = require('./util/appView');
var Helpers = require('./util/helper');
var Filter = require('../../node_modules/backbone-async-route-filters/backbone-async-route-filter');
var alertify = require('alertifyjs');

Backbone.$ = $;

$(function () {
	window.Backend_url = 'http://localhost/';
	window.Hash_login = '#login';
	window.helper = new Helpers();
	window.appView = new AppView();
  window.silentData = {silent: true};
  window.triggerData = {trigger: true};
  window.fetchData = {fetch: true};
  window.notFound = {notFound: true};
  window.rootView = 'static/js/view/';

  alertify.defaults.theme.ok = "btn btn-primary";
  alertify.defaults.theme.cancel = "btn btn-danger";
  
	Backbone.Main = new RouterMain();


});
