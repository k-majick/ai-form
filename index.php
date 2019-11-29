<?php /* Template Name: Index */ ?>
<?php get_header(); ?>

<main>
  <div class="container">
    <h1 class="title title--main"><?php bloginfo('name') ?></h1>

<?php query_posts('pagename=content'); if (have_posts()) : the_post(); ?>

    <p class="text-center mb-5">
      <?php the_field('intro'); ?>
    </p>

    <form id="ai-form" method="post" enctype="multipart/form-data">

      <input class="email email-sofia hidden" type="checkbox" data-type="bcc" name="ai_sendTo" value="sofia@adprime.pl">
      <input class="email email-maciek hidden" type="checkbox" name="ai_sendTo" value="m.klimowicz@adprime.pl">

      <input class="email email-dzienis hidden" type="checkbox" data-type="bcc" name="ai_sendTo" value="tomasz.dzienis@nepirockcastle.com">
      <input class="email email-kupryjaniuk hidden" type="checkbox" data-type="bcc" name="ai_sendTo" value="monika.kupryjaniuk@nepirockcastle.com">
      <input class="email email-lukasiewicz hidden" type="checkbox" data-type="bcc" name="ai_sendTo" value="anna.lukasiewicz@nepirockcastle.com">
      <input class="email email-olszowiec hidden" type="checkbox" data-type="bcc" name="ai_sendTo" value="ewelina.nowak-olszowiec@nepirockcastle.com">
      <input class="email email-wiernicka hidden" type="checkbox" data-type="bcc" name="ai_sendTo" value="olga.wiernicka@nepirockcastle.com">

      <input class="email email-alfa hidden" type="checkbox" name="ai_sendTo" value="alfa@adprime.pl">
      <input class="email email-fmpt hidden" type="checkbox" name="ai_sendTo" value="fmpt@adprime.pl">
      <input class="email email-fmzg hidden" type="checkbox" name="ai_sendTo" value="fmzg@adprime.pl">
      <input class="email email-karolinka hidden" type="checkbox" name="ai_sendTo" value="karolinka@adprime.pl">
      <input class="email email-platan hidden" type="checkbox" name="ai_sendTo" value="platan@adprime.pl">
      <input class="email email-pogoria hidden" type="checkbox" name="ai_sendTo" value="pogoria@adprime.pl">
      <input class="email email-tomaszow hidden" type="checkbox" name="ai_sendTo" value="galeriatomaszow@adprime.pl">
      <input class="email email-wolomin hidden" type="checkbox" name="ai_sendTo" value="galeriawolomin@adprime.pl">

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="ai_object">Centrum handlowe</label><br>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ai_object" id="ai_alfa" value="Alfa Centrum Białystok">
            <label class="form-check-label" for="ai_alfa">
              Alfa Centrum Białystok (tylko FB)
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ai_object" id="ai_karolinka" value="CH Karolinka">
            <label class="form-check-label" for="ai_karolinka">
              CH Karolinka
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ai_object" id="ai_platan" value="CH Platan">
            <label class="form-check-label" for="ai_platan">
              CH Platan
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ai_object" id="ai_pogoria" value="CH Pogoria">
            <label class="form-check-label" for="ai_pogoria">
              CH Pogoria
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ai_object" id="ai_fmpt" value="Focus Mall Piotrków Trybunalski">
            <label class="form-check-label" for="ai_fmpt">
              Focus Mall Piotrków Trybunalski
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ai_object" id="ai_fmzg" value="Focus Mall Zielona Góra">
            <label class="form-check-label" for="ai_fmzg">
              Focus Mall Zielona Góra
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ai_object" id="ai_tomaszow" value="Galeria Tomaszów">
            <label class="form-check-label" for="ai_tomaszow">
              Galeria Tomaszów
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ai_object" id="ai_wolomin" value="Galeria Wołomin">
            <label class="form-check-label" for="ai_wolomin">
              Galeria Wołomin
            </label>
          </div>
        </div>
        <div class="form-group col-md-6">
          <label>Kategoria wpisu</label>
          <div class="form-check ai_news">
            <input class="form-check-input" type="radio" name="ai_category" id="ai_news" value="Aktualności">
            <label class="form-check-label" for="ai_news">
              Aktualności
            </label>
          </div>
          <div class="form-check ai_products">
            <input class="form-check-input" type="radio" name="ai_category" id="ai_products" value="Nowości">
            <label class="form-check-label" for="ai_products">
              Nowości
            </label>
          </div>
          <div class="form-check ai_promotions">
            <input class="form-check-input" type="radio" name="ai_category" id="ai_promotions" value="Promocje">
            <label class="form-check-label" for="ai_promotions">
              Promocje
            </label>
          </div>
          <div class="form-check ai_recruitment">
            <input class="form-check-input" type="radio" name="ai_category" id="ai_recruitment" value="Rekrutacja">
            <label class="form-check-label" for="ai_recruitment">
              Rekrutacja
            </label>
          </div>
          <div class="form-check ai_slider">
            <input class="form-check-input" type="radio" name="ai_category" id="ai_slider" value="Slider">
            <label class="form-check-label" for="ai_slider">
              Slider
            </label>
          </div>
          <div class="form-check ai_events">
            <input class="form-check-input" type="radio" name="ai_category" id="ai_events" value="Wydarzenia">
            <label class="form-check-label" for="ai_events">
              Wydarzenia
            </label>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="ai_name">Nazwa sklepu</label>
          <input type="text" class="form-control" name="ai_name" id="ai_name">
        </div>
        <div class="form-group col-md-6">
          <label for="ai_email">Adres e-mail</label>
          <input type="email" class="form-control" name="ai_email" id="ai_email">
        </div>
      </div>
      <div class="form-group ai-title">
        <label for="ai_title">Tytuł wpisu</label>
        <input type="text" class="form-control" name="ai_title" id="ai_title">
      </div>
      <div class="form-group ai-lead hidden">
        <label for="ai_lead">Zajawka</label>
        <textarea class="form-control ignore" name="ai_lead" id="ai_lead" rows="3" placeholder="<?php the_field('zajawka'); ?>"></textarea>
      </div>
      <div class="form-group ai-content">
        <label for="ai_content">Treść wpisu</label>
        <textarea class="form-control" name="ai_content" id="ai_content" rows="5" placeholder="<?php the_field('tresc'); ?>"></textarea>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6 ai-upload">
          <label>Załączniki</label>
          <br>
          <input class="inputfile" data-multiple-caption="Liczba plików: {count}" type="file" name="ai_upload" id="ai_upload" multiple>
          <label for="ai_upload">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path style="fill: #fff"; d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
            <span>Wybierz pliki</span>
          </label>
        </div>
        <div class="form-group col-md-6 ai-uploadPdf hidden">
          <label>Załącznik</label>
          <br>
          <input class="inputfile ignore" data-multiple-caption="Liczba plików: {count}" type="file" name="ai_uploadPdf" id="ai_uploadPdf" multiple>
          <label for="ai_uploadPdf">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path style="fill: #fff"; d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
            <span>Załącz plik</span>
          </label>
        </div>
        <div class="form-group col-md-6">
          <label>Termin publikacji</label>
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

<?php endif; wp_reset_query(); ?>

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
