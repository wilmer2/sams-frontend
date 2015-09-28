var Audits = require('../collection/audits');
var AuditList = require('../view/audit/auditTableView');

function AuditCtrl () {
  this.getList =  function () {
    var audits = new Audits();
    var auditList = new AuditList({collection: audits});

    audits.getFirstPage(fetchData)
    .done(function () {
      appView.showUserView(auditList);
    })

  }
}

module.exports = AuditCtrl;