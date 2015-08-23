var Backbone   = require('backbone');
var $          = require('jquery');
var _          = require('underscore');
var Bloodhound = require('../../../bower_components/typeahead.js/dist/bloodhound.js');
var typeahead  = require('../../../bower_components/typeahead.js/dist/typeahead.jquery');


module.exports = Backbone.View.extend({
	template: $('#menu-view').html(),
  

	render: function () {
		this.$el.html(this.template);
    this.initTypehead();
	},

  initTypehead: function () {
       console.log('init typeahead test');
       var substringMatcher = function(strs) {
              
          return function findMatches(q, cb) {
          var matches, substringRegex;
          // an array that will be populated with substring matches
          matches = ['hola', 'mundo'];

          cb(matches);
          };
      };
      var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
                 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
                 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
                 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
                 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
                 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
                 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
                 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
                 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

      $('#remote .typeahead').typeahead(
        {
          hint: true,
          minLength: 1
        },
        {
          name: 'states',
          source: substringMatcher(states)
        });
  },

  close: function () {
    this.remove();
  }


});