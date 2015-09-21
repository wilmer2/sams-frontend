var PageableCollection = require('backbone.paginator');
var _ = require('underscore');
var Attendance = require('../model/attendance');

module.exports = PageableCollection.extend({
  model: Attendance,
  mode: 'client',
  state: {
    firstPage: 1,
    currentPage: 1,
    pageSize: 20,
    sortKey: 'start_time'
  },

  parseRecords: function (res) {
    if (res.status == 'success') {
      this.totalRecords = res.data.length;
      var data = res.data;

      return data;
    } else {
      var message = res.message;

      this.trigger('notAttendance', message);
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
  },

  search: function (letters) {
    var letters = letters.trim();
    var searchFor = ['identity_card','first_name', 'last_name', 'date_day'];

    if (letters != '') {
      return this.fullCollection.filter(function (model) {
        return _.some(_.values(model.pick(searchFor)), function (value) {
          return ~value.toLowerCase().indexOf(letters);
        });
      });
    }
  }

})



