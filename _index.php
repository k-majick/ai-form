<?php /* Template Name: Index */ ?>
<?php get_header(); ?>

<main>
  <div class="container">
    <h1 class="title title--main"><?php bloginfo('name') ?></h1>
    <form id="ai-form" method="post" enctype="multipart/form-data">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Kategoria wpisu<sup class="error">*</sup></label>
          <div class="form-check">
            <input class="form-check-input required" type="radio" name="ai_category" id="ai_news" value="Aktualności">
            <label class="form-check-label" for="ai_news">
              Aktualności
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="ai_category" id="ai_promotions" value="Promocje">
            <label class="form-check-label" for="ai_promotions">
              Promocje
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="ai_category" id="ai_events" value="Wydarzenia">
            <label class="form-check-label" for="ai_events">
              Wydarzenia
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="ai_category" id="ai_recruitment" value="Rekrutacja">
            <label class="form-check-label" for="ai_recruitment">
              Rekrutacja
            </label>
          </div>
        </div>
        <div class="form-group col-md-6">
          <label for="ai_object">Centrum handlowe<sup class="error">*</sup></label>
          <select id="ai_object" name="ai_object" class="form-control">
            <option disabled selected value>-- Wybierz centrum handlowe --</option>
            <option>Alfa Centrum</option>
            <option>CH Karolinka</option>
            <option>CH Platan</option>
            <option>CH Pogoria</option>
            <option>Focus Mall Piotrków Trybunalski</option>
            <option>Focus Mall Zielona Góra</option>
            <option>Galeria Tomaszów</option>
            <option>Galeria Wołomin</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="ai_name">Nazwa sklepu / najemcy<sup class="error">*</sup></label>
          <small class="form-text text-muted">Proszę podać nazwę sklepu lub najemcy (3-50 znaków).</small>
          <input type="text" class="form-control" name="ai_name" id="ai_name" placeholder="Podaj nazwę sklepu lub najemcy">
        </div>
        <div class="form-group col-md-6">
          <label for="ai_email">Adres e-mail<sup class="error">*</sup></label>
          <small class="form-text text-muted">Proszę podać adres e-mail do kontaktu z nami.</small>
          <input type="email" class="form-control" name="ai_email" id="ai_email" placeholder="Podaj swój adres e-mail">
        </div>
      </div>
      <div class="form-group">
        <label for="ai_title">Tytuł wpisu<sup class="error">*</sup></label>
        <small class="form-text text-muted">Proszę wpisać tytuł informacji do opublikowania (10-150 znaków).</small>
        <input type="text" class="form-control" name="ai_title" id="ai_title" placeholder="Podaj tytuł wpisu">
      </div>
      <div class="form-group">
        <label for="ai_content">Treść wpisu<sup class="error">*</sup></label>
        <small class="form-text text-muted">Proszę wkleić treść informacji do opublikowania (150-1500 znaków).</small>
        <textarea class="form-control" name="ai_content" id="ai_content" placeholder="Wklej treść wpisu" rows="5"></textarea>
      </div>
      <div class="form-group">
        <div class="form-row">
          <div class="col">
            <label for="ai_upload">Załączniki<sup class="error">*</sup></label>
            <small class="form-text text-muted">Proszę załączyć pliki graficzne (od 1 do 6).</small>
            <input type="file" name="ai_upload[]" id="ai_upload" multiple>
          </div>
          <div class="col">
            <label>Termin publikacji</label>
            <small class="form-text text-muted">Proszę wybrać termin publikacji.</small>
            <div class="form-row">
              <div class="col">
                <input type="text" class="form-control" name="ai_dateFrom" id="ai_dateFrom" placeholder="Wybierz datę od">
              </div>
              <div class="col">
                <input type="text" class="form-control" name="ai_dateTo" id="ai_dateTo" placeholder="Wybierz datę do">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group text-center">
        <div id="recaptcha" class="table-center" data-sitekey="6LeCPaAUAAAAAEnJKgjz-zzGmYqOXgIDNrt0Faso"></div>
        <input type="hidden" class="hiddenRecaptcha required posted" name="hiddenRecaptcha" id="hiddenRecaptcha" />
        <script src="https://www.google.com/recaptcha/api.js?onload=loadCaptcha&render=explicit" async defer></script>
      </div>
      <div class="form-group text-center">
        <button type="reset" class="btn btn-warning" id="ai-reset">Reset</button>
        <button type="submit" class="btn btn-primary" id="ai-submit">Wyślij</button>
      </div>
      <div class="form-group text-center">
        <span id="ai-alert" class="text-center"></span>
      </div>
    </form>
  </div>
</main>

<script>
  var captchaContainer = null;
  var loadCaptcha = function() {
    recaptcha = grecaptcha.render('recaptcha', {
      'sitekey' : '6LeCPaAUAAAAAEnJKgjz-zzGmYqOXgIDNrt0Faso',
      'callback' : function(response) {
        console.log(response);
      }
    });
  };
</script>

<?php get_footer(); ?>
