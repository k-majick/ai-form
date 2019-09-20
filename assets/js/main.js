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
      var form = $('#ai-form'),
        alert = $('#ai-alert'),
        submit = $('#ai-submit'),
        reset = $('#ai-reset'),
        inputs = document.querySelectorAll('.inputfile'),
        lead = $('.ai-lead'),
        content = $('.ai-content'),
        upload = $('.ai-upload'),
        pdf = $('.ai-uploadPdf'),
        title = $('.ai-title'),
        isRecruitment = false,
        objectList = [],
        mailToList = [],
        email_maciek = $('.email-maciek'),
        email_sofia = $('.email-sofia'),

        email_dzienis = $('.email-dzienis'),
        email_kupryjaniuk = $('.email-kupryjaniuk'),
        email_lukasiewicz = $('.email-lukasiewicz'),
        email_olszowiec = $('.email-olszowiec'),
        email_wiernicka = $('.email-wiernicka'),

        email_alfa = $('.email-alfa'),
        email_karolinka = $('.email-karolinka'),
        email_platan = $('.email-platan'),
        email_pogoria = $('.email-pogoria'),
        email_fmpt = $('.email-fmpt'),
        email_fmzg = $('.email-fmzg'),
        email_tomaszow = $('.email-tomaszow'),
        email_wolomin = $('.email-wolomin');

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

      // ai_news[0].disabled = true;

      // setEmail
      function setEmails(el) {
        var val = el.val();
        // console.log(val);
        var list = $("input[name='ai_object']:checked").map(function() {
          return this.value;
        }).get();

        // email_sofia.prop('checked', true);
        // email_maciek.prop('checked', true);

        if ((list.indexOf("Alfa Centrum") != -1) || (list.indexOf("Galeria Wołomin") != -1)) {
          email_kupryjaniuk.prop('checked', true);
        } else {
          email_kupryjaniuk.prop('checked', false);
        }

        if ((list.indexOf("Focus Mall Piotrków Trybunalski") != -1) || (list.indexOf("Galeria Tomaszów") != -1)) {
          email_wiernicka.prop('checked', true);
        } else {
          email_wiernicka.prop('checked', false);
        }

        if ((list.indexOf("CH Platan") != -1) || (list.indexOf("CH Pogoria") != -1)) {
          email_olszowiec.prop('checked', true);
        } else {
          email_olszowiec.prop('checked', false);
        }

        if (list.indexOf("Alfa Centrum") != -1) {
          email_alfa.prop('checked', true);
          email_dzienis.prop('checked', true);
        } else {
          email_alfa.prop('checked', false);
          email_dzienis.prop('checked', false);
        }

        if (list.indexOf("Focus Mall Piotrków Trybunalski") != -1) {
          email_fmpt.prop('checked', true);
        } else {
          email_fmpt.prop('checked', false);
        }

        if (list.indexOf("Focus Mall Zielona Góra") != -1) {
          email_fmzg.prop('checked', true);
          email_lukasiewicz.prop('checked', true);
        } else {
          email_fmzg.prop('checked', false);
          email_lukasiewicz.prop('checked', false);
        }

        if (list.indexOf("CH Karolinka") != -1) {
          email_karolinka.prop('checked', true);
        } else {
          email_karolinka.prop('checked', false);
        }

        if (list.indexOf("CH Platan") != -1) {
          email_platan.prop('checked', true);

        } else {
          email_platan.prop('checked', false);
        }

        if (list.indexOf("CH Pogoria") != -1) {
          email_pogoria.prop('checked', true);
        } else {
          email_pogoria.prop('checked', false);
        }

        if (list.indexOf("Galeria Tomaszów") != -1) {
          email_tomaszow.prop('checked', true);
        } else {
          email_tomaszow.prop('checked', false);
        }

        if (list.indexOf("Galeria Wołomin") != -1) {
          email_wolomin.prop('checked', true);
        } else {
          email_wolomin.prop('checked', false);
        }

        var emailList = $("input[name='ai_sendTo']:checked").map(function() {
          return this.value;
        }).get();

        mailToList = emailList;
        // console.log(mailToList);
      };

      // setCategories
      function setCategories() {
        var list = $("input[name='ai_object']:checked").map(function() {
          return this.value;
        }).get();

        for (var i = 0; i < ai_category.length; i++) {
          ai_category[i].disabled = true;
        }

        if (list.indexOf("Galeria Wołomin") != -1 || list.indexOf("Galeria Tomaszów") != -1) {
          lead.find('.form-control').removeClass('ignore');
          lead.slideDown('fast');
        } else {
          lead.find('.form-control').addClass('ignore');
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
          list.indexOf("Focus Mall Zielona Góra") != -1 ||
          list.indexOf("CH Platan") != -1 ||
          list.indexOf("CH Pogoria") != -1
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
          list.indexOf("CH Pogoria") != -1 ||
          list.indexOf("Focus Mall Zielona Góra") != -1
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
      };

      // function setExtraRules() {
      //   setTimeout(function() {
      //     if (isRecruitment == true) {
      //       console.log("active");
      //       $("input#ai_upload").rules('add', {
      //         required: true,
      //         maxfilesize: 3,
      //         extension: "pdf",
      //         messages: {
      //           required: "Załącz plik PDF z ogłoszeniem",
      //           maxfilesize: "Maksymalna waga pliku wynosi 3 MB",
      //           extension: "Dozwolony jest tylko 1 plik w formacie PDF"
      //         }
      //       });
      //     } else if (isRecruitment == false) {
      //       console.log("disabled");
      //       // $("input#ai_upload").rules('add', {
      //       //   required: true,
      //       //   minmaxupload: [1, 2],
      //       //   maxfilesize: 3,
      //       //   extension: "jpg|jpeg|png",
      //       //   mindimensions: [800, 800],
      //       //   messages: {
      //       //     required: "Załącz pliki graficzne",
      //       //     maxfilesize: "Maksymalna waga jednego pliku wynosi 3 MB",
      //       //     extension: "Dozwolone są tylko pliki w formacie JPG/JPEG lub PNG"
      //       //   }
      //       // });
      //     }
      //   }, 0);
      // };
      // setExtraRules();

      // checkRecruitment
      function checkRecruitment() {
        var objList = $("input[name='ai_object']:checked").map(function() {
          return this.value;
        }).get();
        if (objList.indexOf("Focus Mall Zielona Góra") != -1) {
          if ($("input#ai_recruitment").prop("checked") == true) {
            title.find("label").first().html('Nazwa oferty pracy');
            content.find('.form-control').addClass('ignore');
            content.slideUp('fast');
            upload.find('input').addClass('ignore');
            upload.slideUp('fast');
            pdf.find('input').removeClass('ignore');
            pdf.slideDown('fast');
            isRecruitment = true;
            console.log("isRecruitment " + isRecruitment);
          } else {
            title.find("label").first().html('Tytuł wpisu');
            content.find('.form-control').removeClass('ignore');
            content.slideDown('fast');
            upload.find('input').removeClass('ignore');
            upload.slideDown('fast');
            pdf.find('input').addClass('ignore');
            pdf.slideUp('fast');
            isRecruitment = false;
            console.log("isRecruitment " + isRecruitment);
          }
        }
      }

      $('input[name=ai_object]').on('change', function(e) {
        setEmails($(this));
        setCategories();
        // setExtraRules();
        checkRecruitment();
      });

      $('input[name=ai_category]').on('change', function(e) {
        // setExtraRules();
        checkRecruitment();
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

        if ((objectList.length > 2) && (objectList.indexOf("Galeria Wołomin") != -1 || objectList.indexOf("Galeria Tomaszów") != -1)) {
          console.log("l > 1, isGw || isGt");
          return "Proszę załączyć 2 obrazy";
        }

        console.log("else");
        return "Proszę załączyć 1 obraz";
      });

      $.validator.addMethod('mindimensions', function(value, element, param) {
        var imageWidth = $(element).data('imageWidth');
        var imageHeight = $(element).data('imageHeight');

        if (isRecruitment == true) {
          return true;
        }

        // 800x500px
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

        // 800x500px
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

      $.validator.addMethod('titlelength', function(value, element, param) {
        var len = element.value.length;
        return (len > param[0] && len < param[1]);
      }, function(param, element) {
        var len = element.value.length;
        if (len < param[0] && isRecruitment == false) {
          return "Tytuł wpisu musi zawierać co najmniej 10 znaków";
        } else if (len > param[1] && isRecruitment == false) {
          return "Tytuł wpisu nie może przekraczać 100 znaków";
        } else if (len < param[0] && isRecruitment == true) {
          return "Nazwa oferty musi zawierać co najmniej 10 znaków";
        } else if (len > param[1] && isRecruitment == true) {
          return "Nazwa oferty nie może przekraczać 100 znaków";
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
          ai_lead: {
            required: true,
            minlength: 40,
            maxlength: 150
          },
          ai_title: {
            required: true,
            titlelength: [10, 100]
          },
          ai_content: {
            required: true,
            minlength: 100,
            maxlength: 1500
          },
          ai_upload: {
            required: true,
            minmaxupload: [1, 2],
            maxfilesize: 3,
            extension: "jpg|jpeg|png",
            mindimensions: [800, 800]
          },
          ai_uploadPdf: {
            required: true,
            maxfilesize: 3,
            extension: "pdf"
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
          "ai_lead": {
            required: "Podaj zajawkę/lead wpisu",
            minlength: "Treść zajawki musi zawierać co najmniej 40 znaków",
            maxlength: "Treść zajawki nie może przekraczać 150 znaków"
          },
          "ai_title": {
            required: "Podaj tytuł lub nazwę, która zachęci do przeczytania",
            minlength: "Tytuł lub nazwa musi zawierać co najmniej 10 znaków",
            maxlength: "Tytuł lub nazwa nie może przekraczać 100 znaków"
          },
          "ai_content": {
            required: "Wpisz treść wpisu",
            minlength: "Treść musi zawierać co najmniej 100 znaków",
            maxlength: "Treść nie może przekraczać 1500 znaków"
          },
          "ai_upload": {
            required: "Załącz pliki graficzne",
            maxfilesize: "Maksymalna waga jednego pliku wynosi 3 MB",
            extension: "Dozwolone są tylko pliki w formacie jpg/jpeg lub png"
          },
          "ai_uploadPdf": {
            required: "Załącz plik pdf z ogłoszeniem",
            maxfilesize: "Maksymalna waga pliku wynosi 3 MB",
            extension: "Dozwolony jest tylko plik w formacie pdf"
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

        console.dir(mailToList);
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
          var pdfData = document.getElementById('ai_uploadPdf');
          for (var i = 0; i < fileData.files.length; i++) {
            // console.log(fileData.files[i].name);
            fd.append('ai_upload[]', fileData.files[i], fileData.files[i].name);
          }
          for (var i = 0; i < pdfData.files.length; i++) {
            fd.append('ai_uploadPdf[]', pdfData.files[i], pdfData.files[i].name);
          }
          fd.append('ai_object', objectList.join(", "));
          fd.append('ai_category', $('input[name=ai_category]:checked').val());
          fd.append('ai_name', $('input[name=ai_name]').val());
          fd.append('ai_email', $('input[name=ai_email]').val());
          fd.append('ai_title', $('input[name=ai_title]').val());
          fd.append('ai_lead', $('textarea[name=ai_lead]').val());
          fd.append('ai_content', $('textarea[name=ai_content]').val());
          fd.append('ai_dateFrom', removeYear(dateFrom));
          fd.append('ai_dateTo', removeYear(dateTo));
          fd.append('ai_sendTo', mailToList);
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
