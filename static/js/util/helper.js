var Handlebars = require('handlebars');
var $ = require('jquery');

module.exports = function () {
  Handlebars.registerHelper('checkView', function (notification, count ,options) {
    if (!notification && count > 0) {
      	return options.fn(this);
    }
	});

	Handlebars.registerHelper('configState', function (state, options) {
		if (!state) {
			return options.fn(this);
		}
	});

	Handlebars.registerHelper('instanceState', function (instance, options) {
		if (instance == 0) {
			return options.fn(this);
		}
	})

  Handlebars.registerHelper('numberMax', function (count, options) {
	  if (count > 20) {
				return new Handlebars.SafeString('+ 20');
		} else {
				return options.fn(this);
			}
	});

	Handlebars.registerHelper('itere', function (elements, current, options) {
	  var list = '<ul class="dropdown-menu">';

		for(var p = 1; p <= elements; p++)	{
			if (current == p) {
			  list = list +  '<li class="active">' + '<a href="#" class="page">' + p + '</a>' + '</li>';
			} else {
					list = list +  '<li>' + '<a href="#" class="page">' + p + '</a>' + '</li>';
				}
		}

    return new Handlebars.SafeString(list + '</ul>');

	});

	Handlebars.registerHelper('prevBtn', function (current, options) {
	  if (current != 1) {
		  	return options.fn(this);
		}
	});
	
	Handlebars.registerHelper('nextBtn', function (elements, current, options) {
	  if (elements != current && elements != 0) {
		  		return options.fn(this);
		}
	});


 Handlebars.registerHelper('selected', function(foo, bar) {
   return foo == bar ? ' selected' : '';
 });

}