var PageableCollection = require('backbone.paginator');
var _ = require('underscore');
var Employee = require('../model/employee');

module.exports = PageableCollection.extend({
  model: Employee,
  url: 'http://localhost/employees',
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
      this.totalRecords = 0;
      var message = res.message;

      this.trigger('notEmployee', message);
    }
  },
  
  totalPage: function () {
    var perPage = 20;
    var records = this.totalRecords;
    var totalPage = Math.ceil( records / perPage);

    return totalPage;
  },
  
  search: function (letters) {
    var letters = letters.trim();
    var searchFor = ['first_name', 'last_name', 'identity_card'];

    if (letters != '')  {
      return this.fullCollection.filter(function (model) {
        return _.some(_.values(model.pick(searchFor)), function (value) {
           return ~value.toLowerCase().indexOf(letters);
        });
      });
    } 
  },


});