var Backbone = require('backbone');
var _ = require('underscore');
var utilHour = require('../util/utilHour');

module.exports = Backbone.Model.extend({
  initialize: function () {
    this.on('change', function (model) {
      model.set({notFound: false}, silentData);
    });

    this.on('confirmCitation', this.confirmCitation);
  },

  confirmCitation: function () {
    var citation = this.get('citation');
    citation = citation - 1;

    this.set('citation', citation);
  },

  dateFormat: function () {
    var date = this.get('date_birth');

    if (!_.isNull(date)) {
      var dateFormat = utilHour.dateFormat(date);

      this.set('date_format', dateFormat);
    }
   
  },

  civilStatus: function () {
    var civilStatus = this.get('civil_status');

    if (!_.isNull(civilStatus)) {
      if (civilStatus == 'married') {
        civilStatus = 'Casado';
      } else {
        civilStatus = 'Soltero';
      }

      this.set('civil_status', civilStatus);
    }
  }
});