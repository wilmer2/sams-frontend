var Backbone = require('backbone');
var _ = require('underscore');
var Instance = require('../model/instance');

module.exports = Backbone.Collection.extend({
  model: Instance,

  parse: function (res) {
    if (res.status == 'success') {
      var instanceData = res.data;
  
      return instanceData;
    } else {
      var message = res.message;

      this.trigger('notInstance', message);
    }
  },

  updateUrl: function (url) {
    this.url = url;
  },

  search: function (letters) {
    var letters = letters.trim();
    var searchFor = ['identity_card'];

    if (letters != '') {
      return this.filter(function (model) {
        return _.some(_.values(model.pick(searchFor)), function (value) {
          return ~value.toLowerCase().indexOf(letters);
        });
      });
    }
  }

});