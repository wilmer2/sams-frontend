var PageableCollection = require('backbone.paginator');
var _ = require('underscore');
var Product = require('../model/product');


module.exports = PageableCollection.extend({
  url: 'http://localhost/products',
  model: Product,
  mode: 'client',
  state: {
    firstPage: 1,
    currentPage: 1,
    pageSize: 20,
    sortKey: 'description'
  },

   parseRecords: function (res) {
    if (res.status == 'success') {
      this.totalRecords = res.data.length;
      var data = res.data;

      return data;
    } else {
      var message = res.message;

      this.trigger('notProduct', message);
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
    var searchFor = ['description'];

    if (letters != '') {
      return this.fullCollection.filter(function (model) {
        return _.some(_.values(model.pick(searchFor)), function (value) {
          return ~value.toLowerCase().indexOf(letters);
        });
      });
    }
  }
})