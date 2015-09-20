var Action = require('../model/action');
var ActionForm = require('../view/action/actionNewView');

function ActionCtrl () {
  this.showForm = function () {
    var action = new Action();
    var actionForm = new ActionForm({model: action});

    appView.showUserView(actionForm);
  }
}

module.exports = ActionCtrl;