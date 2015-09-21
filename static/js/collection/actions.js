var PageableCollection = require('backbone.paginator');
var _ = require('underscore');
var Action = require('../model/action');

module.exports = PageableCollection.extend({
  model: Action,
  url: 'http://localhost/actions',
  mode: 'client',
  state: {
    firstPage: 1,
    currentPage: 1,
    pageSize: 20,
    sortKey: 'name'
  },

  parseRecords: function (res) {
    if (res.status == 'success') {
      this.totalRecords = res.data.length;
      var data = res.data;

      return data;
    } else {
      var message = res.message;

      this.trigger('notAction', message);
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
    var searchFor = ['name'];

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
  }

})