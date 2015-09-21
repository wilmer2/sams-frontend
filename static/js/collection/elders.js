var Elder = require('../model/elder');
var PageableCollection = require('backbone.paginator');
var _ = require('underscore');

module.exports = PageableCollection.extend({
	model: Elder,
	mode: 'client',
	state: {
		firstPage: 1,
		currentPage: 1,
		pageSize: 20,
		sortKey: 'full_name'
	},

	parseRecords: function (res) {
		if (res.status == 'success') {
		  this.totalRecords = res.data.length;

			return res.data;
		} else {
      this.totalRecords = 0;

			this.trigger('notElder', res.message);
		}
	},
  
  totalPage: function () {
  	var perPage = 20;
  	var records = this.totalRecords;
  	var totalPage = Math.ceil( records / perPage);

  	return totalPage;
  },

  updateUrl: function (url) {
  	this.url = url;
  },
  
  search: function (letters) {
    var letters = letters.trim();
    var searchFor = ['full_name', 'identity_card'];

    if (letters != '')  {
      return this.fullCollection.filter(function (model) {
        return _.some(_.values(model.pick(searchFor)), function (value) {
           return ~value.toLowerCase().indexOf(letters);
        });
      });
    } 
  },


});


