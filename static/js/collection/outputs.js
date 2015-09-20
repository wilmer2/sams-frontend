var PageableCollection = require('backbone.paginator');
var _ = require('underscore');
var Output = require('../model/output');

module.exports = PageableCollection.extend({
  model: Output,
  mode: 'client',
  state: {
    firstPage: 1,
    currentPage: 1,
    pageSize: 20,
    sortKey: 'created_at'
  },

  parseRecords: function (res) {
    if (res.status == 'success') {
      this.totalRecords = res.data.length;
      var data = res.data;

      return data;
    } else {
      var message = res.message;

      this.trigger('notOutput', message);
    }
  },

  totalPage: function () {
    var perPage = 20;
    var records = this.totalRecords;
    var totalPage = Math.ceil(records / perPage);

    return totalPage;
  },

  search: function (letters) {
    var letters = letters.trim();
    var searchFor = ['identity_card','full_name'];

    if (letters != '') {
      return this.fullCollection.filter(function (model) {
        return _.some(_.values(model.pick(searchFor)), function (value) {
          return ~value.toLowerCase().indexOf(letters);
        });
      });
    }
  },

  updateUrl: function (url) {
    this.url = url;
  },


})