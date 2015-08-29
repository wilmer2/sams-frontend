var Backbone = require('backbone');
var $        = require('jquery');
var util     = require('../util/util');

module.exports = Backbone.View.extend({
  template: $('#register-record').html(),

  events: {
    'click .initCamera': 'showModal',
    'click .pick': 'snapShot',
    'click  #snap-repeat': 'showCamera',
    'click #confirm-modalPick': 'showPick'
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
       var message = 'Navegador no compatible con funcion de camara';
       util.showError(message);
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
            this.closeBtn();
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
      var width  = camera.width();
      var height = camera.height();

      this.widthImg  = width;
      this.heightImg = height
      this.pickCam   = camera[0];

      canvas.attr({'width': this.widthImg,'height': this.heightImg});
      var ctx = canvas[0].getContext('2d');
      ctx.drawImage(this.pickCam, 0 , 0 , this.widthImg, this.heightImg);
      this.closeCamera();
      this.showBtn();
    }
   
  },

  showPick: function () {
    var canvasForm = this.$canvasForm;
    canvasForm.attr({'width': this.widthImg, 'height': this.heightImg});

    var ctxForm = canvasForm[0].getContext('2d');
    ctxForm.drawImage(this.pickCam, 0, 0 , this.widthImg, this.heightImg);
    this.closeModal();
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

  showBtn: function () {
    this.$snapRecord.hide();
    this.$contentBtn.show();
  },

  closeBtn: function () {
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