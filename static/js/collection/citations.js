var Citation           = require('../model/citation');
var PageableCollection = require('backbone.paginator');

module.exports = PageableCollection.extend({
  url: 'http://localhost/citations/hour/day',
  model: Citation,
  mode: 'client',

  state: {
    firstPage: 1,
    currentPage: 1,
    pageSize: 6,
  },

  parseRecords: function (res) {
    if (res.status == 'success') {
      return res.data;
    }
  }
})