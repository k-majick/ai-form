"use strict";

var $ = jQuery.noConflict(),
  body = $('body'),
  App = {
    init: function() {
      this.adPrimeForm();
      this.datePicker();
    },

    // adPrime form
    adPrimeForm: function() {
      var form = $('#ai-form');
      var alert = $('#ai-alert');
      var submit = $('#ai-submit');
      var reset = $('#ai-reset');
      var inputs = document.querySelectorAll('.inputfile');
      var lead = $('.ai-lead');
      var objectList = [];
      var mailToList = [];
      var karim = $('.email-karim');
      var relka = $('.email-relka');
      var sofia = $('.email-sofia');

      var ai_news = $('#ai_news'),
        ai_promotions = $('input#ai_promotions'),
        ai_events = $('input#ai_events'),
        ai_products = $('input#ai_products'),
        ai_recruitment = $('input#ai_recruitment'),
        ai_slider = $('input#ai_slider'),
        ai_category = $('input[name=ai_category]');

      for (var i = 0; i < ai_category.length; i++) {
        ai_category[i].disabled = true;
      }
      ai_news[0].disabled = true;

      // set email to
      $('input[name=ai_object]').on('change', function(e) {
        var val = $(this).val();
        var list = $("input[name='ai_object']:checked").map(function() {
          return this.value;
        }).get();

        sofia.prop('checked', true);

        if (list.length == 1 && list.indexOf("Alfa Centrum") != -1 && ai_promotions.is(':checked')) {
          sofia.prop('checked', false);
        } else {
          sofia.prop('checked', true);
        }

        if (
          list.indexOf("CH Platan") != -1 ||
          list.indexOf("CH Pogoria") != -1
        ) {
          relka.prop('checked', true);
        } else {
          relka.prop('checked', false);
        };

        if (
          list.indexOf("Alfa Centrum") != -1 ||
          list.indexOf("Focus Mall Piotrków Trybunalski") != -1 ||
          list.indexOf("Focus Mall Zielona Góra") != -1
        ) {
          karim.prop('checked', true);
        } else {
          karim.prop('checked', false);
        };

        var emailList = $("input[name='ai_sendTo']:checked").map(function() {
          return this.value;
        }).get();

        mailToList = emailList;
        // console.log(mailToList);
      });

      // category mods
      $('input[name=ai_category]').on('change', function(e) {

        var list = $("input[name='ai_object']:checked").map(function() {
          return this.value;
        }).get();

        if (list.length == 1 && ai_promotions.is(':checked') && list.indexOf("Alfa Centrum") != -1) {
          sofia.prop('checked', false);
        } else {
          sofia.prop('checked', true);
        }

        var emailList = $("input[name='ai_email']:checked").map(function() {
          return this.value;
        }).get();

        mailToList = emailList;

      });

      // additional field
      $('input[name=ai_object]').on('change', function(e) {
        var val = $(this).val();
        var list = $("input[name='ai_object']:checked").map(function() {
          return this.value;
        }).get();

        for (var i = 0; i < ai_category.length; i++) {
          ai_category[i].disabled = true;
        }

        if (list.indexOf("Galeria Wołomin") != -1 || list.indexOf("Galeria Tomaszów") != -1) {
          lead.slideDown('fast');
        } else {
          lead.slideUp('fast');
        }

        if (
          list.indexOf("Alfa Centrum") != -1 ||
          list.indexOf("Galeria Wołomin") != -1 ||
          list.indexOf("Galeria Tomaszów") != -1 ||
          list.indexOf("CH Karolinka") != -1 ||
          list.indexOf("CH Platan") != -1 ||
          list.indexOf("CH Pogoria") != -1 ||
          list.indexOf("Focus Mall Piotrków Trybunalski") != -1 ||
          list.indexOf("Focus Mall Zielona Góra") != -1
        ) {
          ai_promotions[0].disabled = false;
        }

        if (
          list.indexOf("Galeria Tomaszów") != -1 ||
          list.indexOf("CH Karolinka") != -1 ||
          list.indexOf("CH Platan") != -1 ||
          list.indexOf("CH Pogoria") != -1 ||
          list.indexOf("Focus Mall Piotrków Trybunalski") != -1 ||
          list.indexOf("Focus Mall Zielona Góra") != -1
        ) {
          ai_news[0].disabled = false;
        }

        if (
          list.indexOf("Focus Mall Piotrków Trybunalski") != -1 ||
          list.indexOf("Focus Mall Zielona Góra") != -1
        ) {
          ai_products[0].disabled = false;
        }

        if (
          list.indexOf("Alfa Centrum") != -1 ||
          list.indexOf("CH Karolinka") != -1 ||
          list.indexOf("CH Platan") != -1 ||
          list.indexOf("CH Pogoria") != -1
        ) {
          ai_events[0].disabled = false;
        }

        if (
          list.indexOf("CH Karolinka") != -1 ||
          list.indexOf("CH Platan") != -1 ||
          list.indexOf("CH Pogoria") != -1
        ) {
          ai_recruitment[0].disabled = false;
        }

        if (
          list.indexOf("Alfa Centrum") != -1
        ) {
          ai_slider[0].disabled = false;
        }

        for (var i = 0; i < ai_category.length; i++) {
          ai_category[i].checked = false;
        }

        objectList = list;
      });

      // upload files
      $('.inputfile').each(function() {
        var $input = $(this),
          $label = $input.next('label'),
          labelVal = $label.html();

        $input.on('change', function(e) {
          var fileName = '';
          var files = this.files;
          var i = 0;
          var imgW = [];
          var imgH = [];

          for (let file of files) {
            var reader = new FileReader();
            reader.onload = function(e) {
              var img = new Image();
              img.src = e.target.result;
              img.onload = function() {
                var w = this.width;
                var h = this.height;
                imgW.push(w);
                imgH.push(h);
              }
            }
            i += 1;
            reader.readAsDataURL(file);
          }
          $input.data('imageWidth', imgW);
          $input.data('imageHeight', imgH);

          if (files && files.length > 1) {
            fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', files.length);
          } else if (e.target.value) {
            fileName = e.target.value.split('\\').pop();
          }
          if (fileName)
            $label.find('span').html(fileName);
          else
            $label.html(labelVal);
        });

        // Firefox bug fix
        $input
          .on('focus', function() {
            $input.addClass('has-focus');
          })
          .on('blur', function() {
            $input.removeClass('has-focus');
          });
      });

      // $.validator.addMethod('minupload', function(value, element, param) {
      //   var length = (element.files.length);
      //   return this.optional(element) || length >= param;
      // });

      $.validator.addMethod('minmaxupload', function(value, element, param) {
        var length = (element.files.length);
        if (objectList.length == 0) {
          console.log('is0obj' + ' ' + objectList.length);
          return length == 99;
        }
        if (objectList.length == 2 && objectList.indexOf("Galeria Wołomin") != -1 && objectList.indexOf("Galeria Tomaszów") != -1) {
          return length == 1;
        }
        if (objectList.length > 1 && (objectList.indexOf("Galeria Wołomin") != -1 || objectList.indexOf("Galeria Tomaszów") != -1)) {
          return length == 2;
        }
        if (objectList.length == 1 && (objectList.indexOf("Galeria Wołomin") != -1 || objectList.indexOf("Galeria Tomaszów") != -1)) {
          return length == 1;
        }
        return length == 1;
      }, function(param, element) {
        if (objectList.length == 0) {
          return "Proszę wybrać galerie handlowe"
        }

        if ((objectList.length == 1) && (objectList.indexOf("Galeria Wołomin") != -1 || objectList.indexOf("Galeria Tomaszów") != -1)) {
          console.log("l=1, isGw || isGt");
          return "Proszę załączyć 1 obraz";
        }

        if ((objectList.length == 2) && (objectList.indexOf("Galeria Wołomin") != -1 && objectList.indexOf("Galeria Tomaszów") != -1)) {
          console.log("l = 2, isGw && isGt");
          return "Proszę załączyć 1 obraz";
        }

        if ((objectList.length > 2) && (objectList.indexOf("Galeria Wołomin") != -1 && objectList.indexOf("Galeria Tomaszów") != -1)) {
          console.log("l > 2, isGw && isGt");
          return "Proszę załączyć 1 obraz";
        }

        if ((objectList.length > 1) && (objectList.indexOf("Galeria Wołomin") != -1 || objectList.indexOf("Galeria Tomaszów") != -1)) {
          console.log("l > 1, isGw || isGt");
          return "Proszę załączyć 2 obrazy";
        }

        console.log("else");
        return "Proszę załączyć 1 obraz";
      });

      $.validator.addMethod('mindimensions', function(value, element, param) {
        var imageWidth = $(element).data('imageWidth');
        var imageHeight = $(element).data('imageHeight');

        // 800x500
        if ((objectList.length == 2 && objectList.indexOf("Galeria Wołomin") != -1 && objectList.indexOf("Galeria Tomaszów") != -1) ||
          ((objectList.length == 1 && (objectList.indexOf("Galeria Wołomin") != -1 || objectList.indexOf("Galeria Tomaszów") != -1)))) {
          console.log('is800x500');
          console.log(imageWidth[0] + 'x' + imageHeight[0]);
          console.log(imageWidth[0] == 800 && imageHeight[0] == 500);
          return (imageWidth[0] == 800 && imageHeight[0] == 500);
        }

        // 600-1000px
        if (objectList.indexOf("Galeria Wołomin") == -1 && objectList.indexOf("Galeria Tomaszów") == -1) {
          console.log('is600x1000');
          console.log((imageWidth[0] >= 600 && imageWidth[0] <= 1000) && (imageWidth[0] == imageHeight[0]));
          return ((imageWidth[0] >= 600 && imageWidth[0] <= 1000) && (imageWidth[0] == imageHeight[0]));
        }

        // 800x500 & 600-1000px
        if (objectList.length > 1 && (objectList.indexOf("Galeria Wołomin") != -1 || objectList.indexOf("Galeria Tomaszów") != -1)) {
          if ((imageWidth[0] == 800 && imageHeight[0] == 500) && ((imageWidth[1] >= 600 && imageWidth[1] <= 1000) && (imageWidth[1] == imageHeight[1]))) {
            return true;
          }
          if ((imageWidth[1] == 800 && imageHeight[1] == 500) && ((imageWidth[0] >= 600 && imageWidth[0] <= 1000) && (imageWidth[0] == imageHeight[0]))) {
            return true;
          }
        }
      }, function(param, element) {
        var imageWidth = $(element).data('imageWidth');
        var imageHeight = $(element).data('imageHeight');

        // 800x500
        if ((objectList.length == 2 && objectList.indexOf("Galeria Wołomin") != -1 && objectList.indexOf("Galeria Tomaszów") != -1) ||
          ((objectList.length == 1 && (objectList.indexOf("Galeria Wołomin") != -1 || objectList.indexOf("Galeria Tomaszów") != -1)))) {
          return "Format obrazu musi wynosić 800x500px";
        }

        // 600-1000px
        if (objectList.indexOf("Galeria Wołomin") == -1 && objectList.indexOf("Galeria Tomaszów") == -1) {
          return "Obraz musi być kwadratem o boku wynoszącym od 600 do 1000px";
        }

        // 800x500 & 600-1000px
        if (objectList.length > 1 && (objectList.indexOf("Galeria Wołomin") != -1 || objectList.indexOf("Galeria Tomaszów") != -1)) {
          return "Jeden z obrazów musi być kwadratem o boku wynoszącym od 600 do 1000px, a drugi musi posiadać format 800x500px"
        }

      });

      $.validator.addMethod('checkSquare', function(value, element, param) {
        var imgH = $(element).data('imageHeight');
        var imgW = $(element).data('imageWidth');
        return ((imgH / imgW) != param) ? "Your image is not a square." :
          "Selected file is an image.";
      });

      $.validator.addMethod('maxfilesize', function(value, element, param) {
        var length = (element.files.length);
        var fileSize = 0;
        if (length > 0) {
          for (var i = 0; i < length; i++) {
            fileSize = element.files[i].size; // get file size
            fileSize = fileSize / 1024; //file size in Kb
            fileSize = fileSize / 1024; //file size in Mb
            return this.optional(element) || fileSize <= param;
          }
        } else {
          return this.optional(element) || fileSize <= param;
        }
      });

      form.validate({
        ignore: ".ignore",
        rules: {
          ai_object: {
            required: true
          },
          ai_category: {
            required: true
          },
          ai_name: {
            required: true,
            minlength: 2,
            maxlength: 50
          },
          ai_email: {
            required: true,
            email: true
          },
          ai_title: {
            required: true,
            minlength: 10,
            maxlength: 100
          },
          ai_lead: {
            required: false,
            minlength: 150,
            maxlength: 500
          },
          ai_content: {
            required: true,
            minlength: 150,
            maxlength: 1500
          },
          ai_upload: {
            required: true,
            // minupload: 1,
            // maxupload: 3,
            minmaxupload: [1, 2],
            maxfilesize: 3,
            extension: "jpg|jpeg|png",
            mindimensions: [800, 800],
            // checkSquare: true
          },
          hiddenRecaptcha: {
            required: function() {
              if (grecaptcha.getResponse() == '') {
                return true;
              } else {
                return false;
              }
            }
          }
        },
        messages: {
          "ai_object": {
            required: "Wybierz centrum handlowe"
          },
          "ai_category": {
            required: "Wybierz kategorię wpisu"
          },
          "ai_name": {
            required: "Podaj nazwę sklepu",
            minlength: "Nazwa sklepu musi zawierać co najmniej 2 znaki",
            maxlength: "Nazwa sklepu nie może przekraczać 50 znaków"
          },
          "ai_email": {
            required: "Podaj swój adres e-mail do kontaktu z nami",
            email: "Podaj prawidłowy adres e-mail"
          },
          "ai_title": {
            required: "Podaj tytuł wpisu, zachęcający do jego przeczytania",
            minlength: "Tytuł musi zawierać co najmniej 15 znaków",
            maxlength: "Tytuł nie może przekraczać 100 znaków"
          },
          "ai_lead": {
            required: "Podaj zajawkę/lead wpisu",
            minlength: "Treść zajawki musi zawierać co najmniej 150 znaków",
            maxlength: "Treść zajawki nie może przekraczać 500 znaków"
          },
          "ai_content": {
            required: "Podaj treść wpisu",
            minlength: "Treść wpisu musi zawierać co najmniej 150 znaków",
            maxlength: "Treść wpisu nie może przekraczać 1500 znaków"
          },
          "ai_upload": {
            required: "Załącz pliki graficzne",
            // minupload: "Załącz co najmniej jeden plik graficzny",
            // maxupload: "Możesz załączyć maksymalnie 3 pliki graficzne",
            // minmaxupload: "Załącz 1 plik graficzny",
            maxfilesize: "Maksymalna waga jednego pliku wynosi 3 MB",
            extension: "Dozwolone są tylko pliki w formacie jpg/jpeg lub png"
          },
          "hiddenRecaptcha": {
            required: "Potwierdź, że nie jesteś robotem."
          }
        },
        errorPlacement: function(error, element) {
          if (element.is(":radio") || element.is(":file") || element.is(":checkbox")) {
            error.appendTo(element.parents('.form-group'));
          } else {
            error.insertAfter(element);
          }
        }
      });

      // reset
      reset.click(function() {
        form[0].reset();
        return false;
      });

      // submit
      $('body').on('click', '#ai-submit', function(e) {
        e.preventDefault();

        // console.log(mailToList.join(", "));
        // console.log("isSofia: " + sofia[0].checked);
        // console.log($('input[type="file"]')[0].files);

        var dateFrom = $('input[name=ai_dateFrom]').val();
        var dateTo = $('input[name=ai_dateTo]').val();

        function removeYear(date) {
          var arr = date.split("/");
          var res = arr.filter(function(i) {
            return i !== arr[2];
          });
          return res.join("/");
        }

        if (form.valid()) {
          var fd = new FormData();
          var fileData = document.getElementById('ai_upload');
          for (var i = 0; i < fileData.files.length; i++) {
            // console.log(fileData.files[i].name);
            fd.append('ai_upload[]', fileData.files[i], fileData.files[i].name);
          }
          fd.append('ai_object', objectList.join(", "));
          fd.append('ai_category', $('input[name=ai_category]').val());
          fd.append('ai_name', $('input[name=ai_name]').val());
          fd.append('ai_email', $('input[name=ai_email]').val());
          fd.append('ai_title', $('input[name=ai_title]').val());
          fd.append('ai_lead', $('textarea[name=ai_lead]').val());
          fd.append('ai_content', $('textarea[name=ai_content]').val());
          fd.append('ai_dateFrom', removeYear(dateFrom));
          fd.append('ai_dateTo', removeYear(dateTo));
          fd.append('ai_sendTo', mailToList.join(", "))
          fd.append('action', 'send_ai_form');
          $.ajax({
            type: 'POST',
            url: '//formularz.adprime.pl/wordpress/wp-admin/admin-ajax.php',
            // url: '//localhost:8888/wordpress/wp-admin/admin-ajax.php',
            data: fd,
            contentType: false,
            processData: false,
            beforeSend: function() {
              alert.fadeOut();
              submit.html('Wysyłam...');
            },
            success: function(response) {
              if (response.type == 'error') {
                alert.html('Wystąpił błąd. Prosimy spróbować ponownie.').fadeIn();
              } else {
                alert.html('Twoja wiadomość została wysłana.').fadeIn();
              }
              form.trigger('reset');
              submit.html('Wyślij');
            },
            error: function(e) {
              console.log(e)
            }
          });
        }
      });
    },

    datePicker: function() {
      var dateToday = new Date();
      var selectedDate;
      $("#ai_dateFrom").datepicker({
        dateFormat: 'dd/mm/yy',
        defaultDate: "+1w",
        changeMonth: true,
        minDate: dateToday,
        onClose: function(selectedDate) {
          $("#ai_dateTo").datepicker("option", "minDate", selectedDate);
        }
      });
      $("#ai_dateTo").datepicker({
        dateFormat: 'dd/mm/yy',
        defaultDate: "+1w",
        changeMonth: true,
        minDate: dateToday,
        onClose: function(selectedDate) {
          $("#ai_dateFrom").datepicker("option", "maxDate", selectedDate);
        }
      });
    }

  };

//Init App here
$(function() {
  App.init();
});
