var Backbone   = require('backbone');
var $          = require('jquery');
var Bloodhound = require('../../../bower_components/typeahead.js/dist/bloodhound.js');
var typeahead  = require('../../../bower_components/typeahead.js/dist/typeahead.jquery');


module.exports = Backbone.View.extend({
	template: $('#menu-view').html(),
  
  events : {
    'keyup #search-elder' : 'test'
  },

	render: function () {
		this.$el.html(this.template);
	},

  test: function (e) {
    var text = $(e.target).val();

    var bestPictures = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
          url: 'http://localhost/search/elders?q='+ text,
      }
    });

    $('#remote .typeahead').typeahead({
         hint: true,
         highlight: true,
         minLength: 1
      }, 
      {
        name: 'best-pictures',
        display: 'value',
        source: bestPictures
      });
},
  
	close: function () {
		this.remove();
	},

});