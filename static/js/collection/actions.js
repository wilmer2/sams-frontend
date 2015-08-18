var Backbone = require('backbone');
var Action   = require('../model/action');

module.exports = Backbone.Collection.extend({
	model: Action
});