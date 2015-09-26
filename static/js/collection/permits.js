var PageableCollection = require('backbone.paginator');
var Permit = require('../model/permit');

module.exports = PageableCollection.extend({
  model: Permit,
  mode: 'client',
  state: {
    firstPage: 1,
    currentPage: 1,
    pageSize: 20,
  },

  parseRecords: function (res) {
    if (res.status == 'success') {
      this.totalRecords = res.data.length;
      var data = res.data;

      return data;
    } else {
      var message = res.message;

      this.trigger('notPermit', message);
    }
  },

  totalPage: function () {
    var perPage = 20;
    var records = this.totalRecords;
    var totalPage = Math.ceil(records / perPage);

    return totalPage;
  },

  updateUrl: function (url) {
    this.url = url;
  }

})