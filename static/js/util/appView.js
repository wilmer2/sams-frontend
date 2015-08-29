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

   this.showElderView = function (view) {
      if (this.currentElderView) {
        this.currentElderView.close();
      }

      this.currentElderView = view;
      this.currentElderView.render();
      
      $('#content-elder').html(this.currentElderView.el);
   }

}

module.exports = appView;