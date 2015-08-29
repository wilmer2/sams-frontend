var Backbone = require('backbone');
var $        = require('jquery');
var util     = require('../util/util');

module.exports = Backbone.View.extend({
  template: $('#register-record').html(),

  events: {
    'click .initCamera': 'showModal',
    'click .pick': 'snapShot',
    'click  #snap-repeat': 'showCamera',
    'click #confirm-modalPick': 'showPick',
    'change #file-record': 'uploadPick'
  },


  render: function () {
    this.$el.html(this.template);

    this.$modalPick = this.$el.find('#modal-pick');
    this.$camera = this.$el.find('#camera-record');
    this.$canvas = this.$el.find('#modal-pickContainer');
    this.$contentBtn = this.$el.find('#container-btn');
    this.$snapRecord = this.$el.find('#snap-record');
    this.$canvasForm = this.$el.find('#form-recordContainer');
  },

  showModal: function () {
     this.$modalPick.show();
     this.showCamera();
  },

  showCamera: function () {
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = navigator.getUserMedia    || navigator.webkitGetUserMedia || 
                             navigator.mozGetUserMedia || navigator.msGetUserMedia  || false;

    if (!navigator.getUserMedia) {
       this.closeModal();
    } else {
        window.dataVideo = {
         'StreamVideo': null,
         'url': null
        }

        navigator.getUserMedia({
         'audio': false,
         'video': true
        }, function(streamVideo) {
            dataVideo.StreamVideo = streamVideo;
            dataVideo.url = window.URL.createObjectURL(streamVideo);
            this.closeCanvas();
            this.showBtn();
            this.$camera.show();
            this.$camera.attr('src', dataVideo.url);
        }.bind(this), function() {
            var message = 'No fue posible obtener acceso a la cámara.';
            util.showError(message);
        });

      }
  },


  snapShot: function (e) {
    e.preventDefault();

    if (dataVideo.StreamVideo) {
      this.showCanvas();

      var canvas = this.$canvas;
      var camera = this.$camera;
      this.pickCam = camera[0];

      canvas.attr({'width': 150,'height': 150});

      var ctx = canvas[0].getContext('2d');

      ctx.drawImage(this.pickCam, 0 , 0, 150, 150);
      this.closeCamera();
      this.optBtn();
    }
   
  },

  showPick: function () {
    var canvasForm = this.$canvasForm;

    canvasForm.attr({'width': 150, 'height': 150});

    var ctxForm = canvasForm[0].getContext('2d');

    ctxForm.drawImage(this.pickCam, 0, 0, 150, 150);
    this.closeModal();
  },

  uploadPick: function (e) {
    var file = e.target.files[0];
    var imageType = /image.*/;

    if (file.type.match(imageType)) {
      var reader = new FileReader();

      reader.onloadend = function (e) {
        var imgFile = $('<img>', {src: e.target.result});
        var canvasFile = this.$canvasForm;

        canvasFile.attr({'width': 150, 'height': 150});

        var ctxFile = canvasFile[0].getContext('2d');

        imgFile.load(function () {
           ctxFile.drawImage(this, 0, 0, 150, 150);
        });

      }.bind(this)
    } else {
      $('input[type="file"]').val('');

      var message = 'Ha ingresado un formato de archivo no valido';
      util.showInfo(message);
    }
   
    reader.readAsDataURL(file);
  },

  showCanvas: function () {
    this.$canvas.show();
  },

  closeCanvas: function () {
    this.$canvas.hide();
  },

  closeCamera: function () {
    this.$camera.hide();
  },

  optBtn: function () {
    this.$snapRecord.hide();
    this.$contentBtn.show();
  },

  showBtn: function () {
    this.$snapRecord.show();
    this.$contentBtn.hide();
  },

  closeModal: function () {
    if (dataVideo.StreamVideo) {
      dataVideo.StreamVideo.stop();
      window.URL.revokeObjectURL(dataVideo.url);
    }

    this.$modalPick.hide();
  },

  close: function () {
    this.remove();
  }

});