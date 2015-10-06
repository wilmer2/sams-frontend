var TaskHour = {
  getCurrentHour: function () {
    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    var currentHour = hour + ':' + min;

    return currentHour
  },

  hourFormat: function (hour) {
    var segment = hour.split(':');

    if (segment.length == 3) {
      segment.splice(2, 1);
    }

    var hour = segment[0];
    var min = segment[1];
    var hourFormat = hour + ':' + min;

    return hourFormat;
  },

  hourStandar: function (hour) {
    var standar = hour.split(':');
    var hourStand = standar[0];
    var meridian = _.indexOf(standar[1], 'm');

    if (meridian < 0) {
      if (hourStand < 12) {
        hourStand = hourStand + ':' + standar[1] + 'am';
      } else {
        if (hourStand >= 13) {
          hourStand = hourStand - 12;
          hourStand = '0' + hourStand;
        }

        hourStand = hourStand + ':' + standar[1] + 'pm';
      }
    } else {
      hourStand = hourStand + ':' + standar[1];
    }

    return hourStand;
  },

  dateFormat: function (date) {
    var segmentDate = date.split('-');
    var day = segmentDate[2];
    var month = segmentDate[1];
    var year = segmentDate[0];
    var dateFormat = day + '/' + month + '/' + year;

    return dateFormat;
  }
}

module.exports = TaskHour;