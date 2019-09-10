<?php /* Template Name: Manager Form */ ?>
<?php get_header(); ?>

<main>
  <div class="container">
    <h1 class="title title--main"><?php the_title(); ?></h1>

<?php query_posts('pagename=content'); if (have_posts()) : the_post(); ?>

    <p class="text-center mb-5">
      <?php the_field('intro_ii'); ?>
    </p>

    <form id="manager-form" method="post" enctype="multipart/form-data">

      <input class="email email-sofia hidden" type="checkbox" name="ai_sendTo" value="sofia@adprime.pl">

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="ai_object">Centrum handlowe</label><br>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="ai_object" id="ai_alfa" value="Alfa Centrum">
            <label class="form-check-label" for="ai_alfa">
              Alfa Centrum
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
          <label for="ai_content">Wiadomość</label>
          <textarea class="form-control" name="ai_content" id="ai_content" rows="9" placeholder=""></textarea>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Załączniki</label>
          <br>
          <input class="inputfile" data-multiple-caption="Liczba plików: {count}" type="file" name="ai_upload" id="ai_upload" multiple>
          <label for="ai_upload">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path style="fill: #fff"; d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>
            <span>Wybierz pliki</span>
          </label>
        </div>
        <div class="form-group col-md-6">
          <label for="ai_email">Adres e-mail</label>
          <input type="email" class="form-control" name="ai_email" id="ai_email">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-12 text-center">
          <button type="reset" class="btn btn-warning" id="ai-reset">Reset</button>
          <button type="submit" class="btn btn-primary" id="ai-submit" name="submit">Wyślij</button>
        </div>
      </div>

      <div class="form-group text-center">
        <span id="ai-alert" class="text-center"></span>
      </div>
    </form>

<?php endif; wp_reset_query(); ?>

  </div>
</main>

<?php get_footer(); ?>
