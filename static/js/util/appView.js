var $ = require('jquery');

function appView () {
	 this.showUserView = function (view) {
	 		if (this.currentUserView) {
	 				this.currentUserView.close();
	 		}

	 		this.currentUserView = view;
	 		this.currentUserView.render();

	 		$('#container-user').html(this.currentUserView.el);
	 }
}


module.exports = appView;