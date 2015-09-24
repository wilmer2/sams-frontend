var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
	tagName: 'tr',
	template: 'elder/templates/elderRow.html',
  events: {
    'click .btn-show': 'redirectShow'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template =  Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);
    }.bind(this))

  	return this;
  },

  redirectShow: function () {
    var elderId = this.model.get('id');

    Backbone.Main.navigate('elder/' + elderId, triggerData);
  }

});
