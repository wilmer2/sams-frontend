var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  initialize: function () {
    this.on('change', function (model) {
      model.set({notFound: false}, silentData);
    })
  }
});
