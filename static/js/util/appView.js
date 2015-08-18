var $ = require('jquery');

function appView () {
	 this.showUserView = function (view) {
	 		if (this.currentUserView) {
	 				this.currentUserView.close();
	 		}

	 		this.currentUserView = view;
	 		this.currentUserView.render();

	 		$('#container-user').html(this.currentUserView.el);
	 },

	 this.showMain = function (view) {
	 	  this.showMainView = view;
	 	  this.showMainView.render();

	 	  $('#main-content').html(this.showMainView.el);
	 }
}


module.exports = appView;