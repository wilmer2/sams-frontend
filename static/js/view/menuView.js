var Backbone   = require('backbone');
var $          = require('jquery');
var _          = require('underscore');
var Bloodhound = require('../../../bower_components/typeahead.js/dist/bloodhound');
var typeahead  = require('../../../bower_components/typeahead.js/dist/typeahead.jquery');


module.exports = Backbone.View.extend({
  el: $('#main-content'),
	template: $('#menu-view').html(),
  
	render: function () {
    console.log('render menu');
		this.$el.html(this.template);
    this.initTypehead();
	},

  initTypehead: function () {
         console.log(typeahead);
      var substringMatcher = function(strs) {
              
          return function findMatches(q, cb) {
          var matches, substringRegex;
          // an array that will be populated with substring matches
          matches = [];
          // regex used to determine if a string contains the substring `q`
          substrRegex = new RegExp(q, 'i');
          // iterate through the pool of strings and for any string that
          // contains the substring `q`, add it to the `matches` array
          $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
                matches.push(str);
            }
          });
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