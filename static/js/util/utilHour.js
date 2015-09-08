TaskHour = {
  getCurrentHour: function () {
    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    var currentHour = hour + ':' + min;

    return currentHour
  }
}

module.exports = TaskHour;