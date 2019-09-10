"use strict";

var $ = jQuery.noConflict(),
  body = $('body'),
  App = {
    init: function() {
      this.managerForm();
    },

    managerForm: function() {
      var form = $('#manager-form');
      var alert = $('#ai-alert');
      var submit = $('#ai-submit');
      var reset = $('#ai-reset');
      var objectList = [];
      var mailToList = [];
      var sofia = $('.email-sofia');

      // get e-mail to
      $('input[name=ai_object]').on('change', function(e) {
        sofia.prop('checked', true);
        var emailList = $("input[name='ai_sendTo']:checked").map(function() {
          return this.value;
        }).get();
        mailToList = emailList;
      });

      // get object list
      $('input[name=ai_object]').on('change', function(e) {
        var val = $(this).val();
        var list = $("input[name='ai_object']:checked").map(function() {
          return this.value;
        }).get();
        objectList = list;
      });

      $.validator.addMethod('maxupload', function(value, element, param) {
        var length = (element.files.length);
        return this.optional(element) || length <= param;
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
          ai_email: {
            required: true,
            email: true
          },
          ai_content: {
            required: true,
            minlength: 50,
            maxlength: 1500
          },
          ai_upload: {
            required: false,
            maxupload: 9,
            maxfilesize: 15,
            extension: "jpg|jpeg|png|pdf|xls|xlsx"
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
          "ai_email": {
            required: "Podaj swój adres e-mail do kontaktu z nami",
            email: "Podaj prawidłowy adres e-mail"
          },
          "ai_content": {
            required: "Podaj treść wpisu",
            minlength: "Treść wpisu musi zawierać co najmniej 50 znaków",
            maxlength: "Treść wpisu nie może przekraczać 1500 znaków"
          },
          "ai_upload": {
            maxupload: "Możesz załączyć maksymalnie 9 plików",
            maxfilesize: "Maksymalna waga jednego pliku wynosi 15 MB",
            extension: "Dozwolone są pliki w formacie jpg/jpeg, png, pdf oraz xls/xlsx"
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
        console.log(mailToList.join(", "));
        console.log(objectList.join(", "));
        // console.log($('input[type="file"]')[0].files);
        if (form.valid()) {
          var fd = new FormData();
          var fileData = document.getElementById('ai_upload');
          for (var i = 0; i < fileData.files.length; i++) {
            // console.log(fileData.files[i].name);
            fd.append('ai_upload[]', fileData.files[i], fileData.files[i].name);
          }
          fd.append('ai_object', objectList.join(", "));
          fd.append('ai_content', $('textarea[name=ai_content]').val());
          fd.append('ai_email', $('input[name=ai_email]').val());
          fd.append('ai_sendTo', mailToList.join(", "))
          fd.append('action', 'send_manager_form');
          $.ajax({
            type: 'POST',
            url: '//formularz.adprime.pl/wordpress/wp-admin/admin-ajax.php',
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

    }
  };

$(function() {
  App.init();
});
