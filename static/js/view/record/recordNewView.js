var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'record/templates/recordNew.html',

  events: {
    'click #recordCamera' : 'showModal',
    'click #recordSnap': 'snapShot',
    'click #recordRepeat': 'repeat',
    'click #recordConfirm': 'showPic',
    'click .close': 'closeModal',
    'change #recordFile': 'uploadPic',
    'submit #form-record': 'register',
  },

  initialize: function () {
    this.photoSource = '';
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Handlebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);

      this.$el.html(html);

      this.$modalPic = this.$el.find('.Modal');
      this.$camera = this.$el.find('.Modal-camera');
      this.$canvas = this.$el.find('.Modal-lienzo');
      this.$confirmBtn = this.$el.find('.Modal-btnConf');
      this.$snap = this.$el.find('#recordSnap');
      this.$canvasForm = this.$el.find('.Lienzo');
      this.$containerBtn = this.$el.find('.Modal-btn');
      this.$close = this.$el.find('.close');
      this.$typeFile = this.$el.find('input[type="file"]');
      
    }.bind(this))
  },

  showModal: function () {
    this.$modalPic.show();
    this.$containerBtn.hide();
    this.$close.hide();
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
            dataVideo.track = streamVideo.getTracks()[0];

            this.closeCanvas();
            this.$containerBtn.show();
            this.showBtn();
            this.$camera.show();
            this.$camera.attr('src', dataVideo.url);
        }.bind(this), function() {
            var message = 'No fue posible obtener acceso a la cámara.';

            util.showInfo(message);
            this.closeModal();
        }.bind(this));

      }
  },

  

  snapShot: function (e) {
    e.preventDefault();

    if (dataVideo.StreamVideo) {
      this.showCanvas();

      var canvas = this.$canvas;
      var camera = this.$camera;
      this.picCam = camera[0];

      canvas.attr({'width': 150,'height': 150});

      var ctx = canvas[0].getContext('2d');

      ctx.drawImage(this.picCam, 0 , 0, 150, 150);

      this.closeCamera();
      this.optBtn();
    }
   
  },

  showPic: function () {
    this.$typeFile.val('');

    this.photoSource = this.$canvas[0].toDataURL('image/png');
    var canvasForm = this.$canvasForm;

    canvasForm.attr({'width': 150, 'height': 150});

    var ctxForm = canvasForm[0].getContext('2d');

    ctxForm.drawImage(this.picCam, 0, 0, 150, 150);
    this.closeModal();
  },

  uploadPic: function (e) {
    var file = e.target.files[0];
    var imageType = /image.*/;
    var canvasFile = this.$canvasForm;
    var ctxFile = canvasFile[0].getContext('2d');
    var filePic = this.$typeFile.val();
    var dropImg = function () {
      this.photoSource = '';
      ctxFile.clearRect(0, 0, 150 , 150)
    }.bind(this);

    if (_.isEmpty(filePic)) {
      dropImg();
    } else {
      if (file.type.match(imageType)) {
        var reader = new FileReader();

        reader.onloadend = function (e) {
          var source = e.target.result;
          var imgFile = $('<img>', {src: source});

          canvasFile.attr({'width': 150, 'height': 150});
          imgFile.load(function () {
            ctxFile.drawImage(this, 0, 0, 150, 150);
          });

          this.photoSource = source;

        }.bind(this)
      } else {
        this.$typeFile.val('');
        var message = 'Ha ingresado un formato de archivo no valido';
      
        util.showError(message);
        dropImg();
      }
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
    this.$snap.hide();
    this.$confirmBtn.show();
  },

  showBtn: function () {
    this.$snap.show();
    this.$confirmBtn.hide();
    this.$close.show();
  },

  repeat: function () {
    this.$containerBtn.hide();
    this.closeReception();
    this.showCamera();
  },

  closeModal: function () {
    this.closeReception();
    this.$modalPic.hide();
  },

  closeReception: function () {
    if (dataVideo.StreamVideo) {
      dataVideo.track.stop();
      window.URL.revokeObjectURL(dataVideo.url);
    }
  },

  register: function (e) {
    e.preventDefault();

    var formData = new FormData($('#form-record')[0]);

    if (!_.isEmpty(this.photoSource)) {
      var mime = util.extractMime(this.photoSource);

      formData.append('photo', this.photoSource);
      formData.append('mime_request', mime);
    }

    $('input[type="checkbox"]').each(function () {
      var checkbox = $(this);

      if (checkbox.is(':checked')) {
        formData.append(checkbox.attr('name'), 1);
      } else {
        formData.append(checkbox.attr('name'), 0);
      }
    
    });

    var elderId = this.model.get('id');

    $.ajax({
       url: Backend_url + 'elder/' + elderId + '/record',
       type: 'POST',
       data: formData,
       processData : false, 
       contentType : false,
    })
    .done(function (res) {
      if (res.status == 'success') {
        var recordData = res.data;

        util.showSuccess(res.message);
        
        this.model.set(recordData);

        var recordId = this.model.get('id');
        
        this.clearElder();

        window.location.href = '#elder/' + elderId + '/record/' + recordId;
      } else {
        util.showError(res.message);
      }
    }.bind(this));
    
  },

  clearElder: function () {
    Backbone.Main.Elder.elder.clear();
  },

  close: function () {
    this.remove();
  },

});