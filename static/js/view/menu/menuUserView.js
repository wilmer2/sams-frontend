var Backbone   = require('backbone');
var $          = require('jquery');
var Handlebars = require('handlebars');
var Bloodhound = require('../../../../bower_components/typeahead.js/dist/bloodhound.js');
var typeahead  = require('../../../../bower_components/typeahead.js/dist/typeahead.jquery');


module.exports = Backbone.View.extend({
	template: 'menu/templates/menuUser.html',

	render: function () {
    return new Promise(function (resolve, reject) {
      $.get(rootView + this.template, function (template) {
         var template =  Handlebars.compile(template);
         var data = this.model.toJSON();
         var html = template(data);

         this.$el.html(html);
         this.initTypehead();

         resolve();
      }.bind(this));
    }.bind(this));
	},
   
  initTypehead: function (e) {
    var elders = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
          url: 'http://localhost/search/elders?q=%QUERY',
          wildcard: '%QUERY'
        }
    });

    $('#remote .typeahead').typeahead({
        hint: true,
        minLength: 2
      },

      {
        name: 'elder',
        source: elders,
        display: 'full_name',
        templates: {
         suggestion: Handlebars.compile('<div><a href="#elder/{{id}}">{{full_name}}</a></div>')
        }

      });

  },

	close: function () {
		this.remove();
	},

});