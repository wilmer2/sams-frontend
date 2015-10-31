var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require('handlebars');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  template: 'citation/templates/citationTableRow.html',
  events: {
    'click .citation-show': 'redirectShow'
  },

  render: function () {
    this.model.hourStandar();
    
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);

    }.bind(this));

    return this;
  },

  redirectShow: function () {
    var elderId = this.model.get('elder_id');
    var citationId = this.model.get('id');

    window.location.href = '#elder/' + elderId + '/citation/waiting';
  }
});