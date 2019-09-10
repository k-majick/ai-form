import '../../node_modules/table2csv/dist/table2csv.min.js';
"use strict";

var $ = jQuery.noConflict(),
  body = $('body'),
  App = {
    init: function() {
      this.reportForm();
      this.datePicker();
    },

    reportForm: function() {
      var form = $('#report-form'),
        results = $('#results'),
        btn_gen = $('#ai-generate'),
        btn_dwn = $('#ai-download'),
        alert = $('ai-alert'),
        objectList = [];

      $('input[name=ai_object]').on('change', function(e) {
        var list = $("input[name='ai_object']:checked").map(function() {
          return this.value;
        }).get();
        objectList = list;
      });

      form.validate({
        ignore: ".ignore",
        rules: {
          ai_object: {
            required: true
          },
          ai_dateFrom: {
            required: true
          },
          ai_dateTo: {
            required: true
          }
        },
        messages: {
          "ai_object": {
            required: "Wybierz centrum handlowe"
          },
          "ai_dateFrom": {
            required: "Wybierz przedział czasowy"
          },
          "ai_dateTo": {
            required: "Wybierz przedział czasowy"
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

      btn_dwn.attr("disabled", true);

      btn_dwn.on('click', function(e) {
        e.preventDefault();
        $("#report_table").table2csv({
          separator: ',',
          newline: '\n',
          quoteFieds: true,
          filename: 'raport.csv'
        });
      });

      btn_gen.on('click', function(e) {
        e.preventDefault();
        var dateFrom = $('input[name=ai_dateFrom]').val();
        var dateTo = $('input[name=ai_dateTo]').val();

        if (form.valid()) {
          var fd = new FormData();
          fd.append('ai_object', objectList.join(", "));
          fd.append('ai_dateFrom', dateFrom);
          fd.append('ai_dateTo', dateTo);
          fd.append('action', 'show_report');
          $.ajax({
            type: 'POST',
            url: '//formularz.adprime.pl/wordpress/wp-admin/admin-ajax.php',
            // url: '//localhost:8888/wordpress/wp-admin/admin-ajax.php',
            data: fd,
            contentType: false,
            processData: false,
            beforeSend: function() {
              alert.fadeOut();
              btn_gen.html('Generuję...');
            },
            success: function(res) {
              if (res.type == 'error') {
                alert.html('Wystąpił błąd. Prosimy spróbować ponownie.').fadeIn();
              } else {
                alert.html('Wygenerowano raport z bazy danych:').fadeIn();
                results.html(res);
              }
              form.trigger('reset');
              btn_gen.html('Wygeneruj');
              btn_dwn.attr("disabled", false);
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
        dateFormat: 'yy-mm-dd',
        defaultDate: "+1w",
        changeMonth: true,
        // minDate: dateToday,
        onClose: function(selectedDate) {
          $("#ai_dateTo").datepicker("option", "minDate", selectedDate);
        }
      });
      $("#ai_dateTo").datepicker({
        dateFormat: 'yy-mm-dd',
        defaultDate: "+1w",
        changeMonth: true,
        // minDate: dateToday,
        onClose: function(selectedDate) {
          $("#ai_dateFrom").datepicker("option", "maxDate", selectedDate);
        }
      });
    }
  };

$(function() {
  App.init();
});
