var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Hanblebars = require('handlebars');
var util = require('../../util/util');

module.exports = Backbone.View.extend({
  template: 'employee/templates/employeeEdit.html',
  className: 'employeeEditView',

  initialize: function () {
    this.photoSource = '';
  },

  events: {
    'click .Form-btnCamera' : 'showModal',
    'click .Modal-snap': 'snapShot',
    'click .Modal-repeat': 'repeat',
    'click .Modal-btnPic': 'showPic',
    'change .Form-file': 'uploadPic',
    'click .close': 'closeModal',
    'submit #form-editEmployee': 'edit'
  },

  render: function () {
    $.get(rootView + this.template, function (template) {
      var template = Hanblebars.compile(template);
      var data = this.model.toJSON();
      var html = template(data);
      var gender = this.model.get('gender');

      this.$el.html(html);
      this.$modalPic = this.$el.find('.Modal');
      this.$camera = this.$el.find('.Modal-camera');
      this.$canvas = this.$el.find('.Modal-lienzo');
      this.$confirmBtn = this.$el.find('.Modal-btnConf');
      this.$snap = this.$el.find('.Modal-snap');
      this.$canvasForm = this.$el.find('.Lienzo');
      this.$containerBtn = this.$el.find('.Modal-btn');
      this.$typeFile = this.$el.find('input[type="file"]');
      this.$close = this.$el.find('.close');
      var radio = this.$el.find('input[value=' + gender + ']:radio');

      radio.prop('checked', true);

      this.loadPic();
    }.bind(this))
  },

  showModal: function () {
    this.$modalPic.show();
    this.$close.hide();
    this.$containerBtn.hide();
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
      this.photoSource = canvas[0].toDataURL('image/png')
      this.closeCamera();
      this.optBtn();
    }
   
  },

  showPic: function () {
    this.$typeFile.val('');
    var canvasForm = this.$canvasForm;
    canvasForm.attr({'width': 150, 'height': 150});

    var ctxForm = canvasForm[0].getContext('2d');
    ctxForm.drawImage(this.picCam, 0, 0, 150, 150);
    this.closeModal();
  },

  uploadPic: function (e) {
    console.log('test');
    var file = e.target.files[0];
    var imageType = /image.*/;
    var canvasFile = this.$canvasForm;
    var ctxFile = canvasFile[0].getContext('2d');
    var fileCanvas = this.$typeFile.val();
    var dropImg = function () {
      ctxFile.clearRect(0, 0, 150 , 150)
    };

    if (_.isEmpty(fileCanvas)) {
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
    this.$close.show();
    this.$confirmBtn.hide();
  },

  repeat: function () {
    this.$containerBtn.hide();
    this.closeReception();
    this.showCamera();
  },

  loadPic: function () {
    var imageUrl = this.model.get('image_url');

    if (!_.isUndefined(imageUrl)) {
      var defaultUrl = 'http://localhost/image/geriatric/default/profile_default_man.png';

      if (imageUrl != defaultUrl) {
        var image = new Image();
        image.src = imageUrl;

        var canvas = this.$canvasForm;
        canvas.attr({'width': 150, 'height': 150});
        var ctx = canvas[0].getContext('2d');

        image.onload = function () {
          ctx.drawImage(image, 0, 0);
        }
      }
    }
  },

  closeModal: function () {
    this.closeReception();
    this.$modalPic.hide();
  },

  closeReception: function () {
    if (dataVideo.StreamVideo) {
      dataVideo.StreamVideo.stop();
      window.URL.revokeObjectURL(dataVideo.url);
    }
  },

  edit: function (e) {
    e.preventDefault();
    var employeeId = this.model.get('id');
    var formData = new FormData($('#form-editEmployee')[0]);

    if (!_.isEmpty(this.photoSource)) {
      var mime = util.extractMime(this.photoSource);

      formData.append('photo', this.photoSource);
      formData.append('mime_request', mime);
    }
      
    $.ajax({
      url: Backend_url + 'employee/' + employeeId + '/edit?_method=PUT',
      type: 'POST',
      data: formData,
      processData : false, 
      contentType : false,
    })
    .done(function (res) {
      if (res.status == 'success') {
        this.model.clear({silent:true});
        util.showSuccess(res.message);
        window.location.replace('#employee/' + employeeId);
      } else {
        util.showError(res.message);
      }
    }.bind(this))
  },

  close: function () {
    this.remove();
  }

});
