var $ = require('jquery');

function appView () {
  this.showMenuView = function (view) {
    if (this.currentMenuView) {
      this.currentMenuView.close();
    }

    this.currentMenuView = view;

    this.currentMenuView.render();

    $('#main-content').html(this.currentMenuView.el);
  }

  this.showAdminView = function (view) {
    if (this.currentAdminView) {
       this.currentAdminView.close();
    }

    this.currentAdminView = view;

    this.currentAdminView.render();

    $('#container-admin').html(this.currentAdminView.el);
  }

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
  },

  this.showEmployeeView = function (view) {
    if (this.currentEmployeeView) {
      this.currentEmployeeView.close();
    }

    this.currentEmployeeView = view;

    this.currentEmployeeView.render();

     $('#content-employee').html(this.currentEmployeeView.el);
  }

}

module.exports = appView;