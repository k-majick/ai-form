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
        isGwOrGt = false,
        isGwAndGt = false,
        is800x500 = false,
        is600_1000 = false,
        isBoth = false,
        objectList = [],
        mailtoList = [],
        bccList = [],
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

      function setEmails(el) {
        var val = el.val();
        var list = $("input[name='ai_object']:checked").map(function() {
          return this.value;
        }).get();

        if ((list.indexOf("Alfa Centrum Białystok") != -1) || (list.indexOf("Galeria Wołomin") != -1)) {
          email_kupryjaniuk.prop('checked', true);
        } else {
          email_kupryjaniuk.prop('checked', false);
        }
        if (list.indexOf("Alfa Centrum Białystok") != -1) {
          email_alfa.prop('checked', true);
        } else {
          email_alfa.prop('checked', false);
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
          return this;
        }).get();

        bccList = emailList
          .filter(email => email.dataset.type == "bcc")
          .map(email => email.value).join(', ');

        mailtoList = emailList
          .filter(email => email.dataset.type !== "bcc")
          .map(email => email.value).join(', ');

      };

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
          list.indexOf("Alfa Centrum Białystok") != -1 ||
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
          list.indexOf("Alfa Centrum Białystok") != -1 ||
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
          list.indexOf("Alfa Centrum Białystok") != -1
        ) {
          ai_slider[0].disabled = false;
        }
        for (var i = 0; i < ai_category.length; i++) {
          ai_category[i].checked = false;
        }
        objectList = list;
      };

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

      function checkGwGt() {
        if (objectList.indexOf("Galeria Wołomin") != -1 && objectList.indexOf("Galeria Tomaszów") != -1) {
          isGwAndGt = true;
          isGwOrGt = false;
        } else if (objectList.indexOf("Galeria Wołomin") != -1 || objectList.indexOf("Galeria Tomaszów") != -1) {
          isGwAndGt = false;
          isGwOrGt = true;
        } else {
          isGwAndGt = false;
          isGwOrGt = false;
        }
        // console.log("isGwOrGt:" + isGwOrGt + " isGWAndGw:" + isGwAndGt);
      }

      function checkFormat() {
        if ((objectList.length == 2 && isGwAndGt == true) || (objectList.length == 1 && isGwOrGt == true)) {
          is800x500 = true;
          is600_1000 = false;
          isBoth = false;
        } else if (objectList.length > 1 && isGwOrGt == true) {
          is800x500 = false;
          is600_1000 = false;
          isBoth = true;
        } else if (isGwAndGt == false && isGwOrGt == false) {
          is800x500 = false;
          is600_1000 = true;
          isBoth = false;
        }
        // console.log("is800x500:" + is800x500 + " is600_1000:" + is600_1000 + " isBoth:" + isBoth);
      }

      $('input[name=ai_object]').on('change', function(e) {
        setEmails($(this));
        setCategories();
        checkRecruitment();
        checkGwGt();
        checkFormat();
      });

      $('input[name=ai_category]').on('change', function(e) {
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

      $.validator.addMethod('minmaxupload', function(value, element, param) {
        var length = (element.files.length);
        if (objectList.length == 0) {
          return length == 99;
        }
        if ((objectList.length == 1) && isGwOrGt == true) {
          return length >= 1 && length <= 5;
        }
        if ((objectList.length == 2) && isGwAndGt == true) {
          return length >= 1 && length <= 5;
        }
        if ((objectList.length > 2) && (isGwOrGt == true || isGwAndGt == true)) {
          return length >= 2 && length <= 5;
        }
        return (length >= 1 && length <= 5);
      }, function(param, element) {
        var length = (element.files.length);
        if (objectList.length == 0) {
          return "Proszę wybrać galerie handlowe"
        }
        if (length > 5) {
          return "Można załączyć maksymalnie 5 obrazów";
        }
        if ((objectList.length == 1) && isGwOrGt == true) {
          return "Proszę załączyć 1 obraz";
        }
        if ((objectList.length == 2) && isGwAndGt == true) {
          return "Proszę załączyć 1 obraz";
        }
        if ((objectList.length > 2) && (isGwOrGt == true || isGwAndGt == true)) {
          return "Proszę załączyć 2 obrazy";
        }
        return "Proszę załączyć 1 obraz";
      });

      $.validator.addMethod('mindimensions', function(value, element, param) {
        var imageWidth = $(element).data('imageWidth'),
          imageHeight = $(element).data('imageHeight'),
          length = (element.files.length);
        var is800x500ok = 0,
          is600_1000ok = 0;

        if (length > 0) {
          for (var i = 0; i < length; i++) {
            // console.dir("w" + imageWidth[i] + " h" + imageHeight[i]);
            if (imageWidth[i] == 800 && imageHeight[i] == 500) {
              is800x500ok++;
            }
            if ((imageWidth[i] >= 600 && imageWidth[i] <= 1000) && (imageWidth[i] == imageHeight[i])) {
              is600_1000ok++;
            }
          }
        }
        console.log("is800x500ok:" + is800x500ok + " is600_1000ok:" + is600_1000ok);

        if (is800x500 == true && is800x500ok >= 1) {
          return true;
        }
        if (is600_1000 == true && is600_1000ok >= 1) {
          return true;
        }
        if (isBoth == true && is800x500ok >= 1 && is600_1000ok >= 1) {
          return true;
        }
        return false;

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

        // var myTo = "m.klimowicz@adprime.pl";
        // var myBcc = "maciej.klimowicz@gmail.com";
        console.log(mailtoList);
        console.log(bccList);
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
          fd.append('ai_sendTo', mailtoList);
          fd.append('ai_sendBcc', bccList);
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
