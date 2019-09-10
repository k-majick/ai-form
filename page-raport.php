<?php /* Template Name: Raport */ ?>
<?php get_header(); ?>

<main>
  <div class="container">
    <h1 class="title title--main"><?php the_title(); ?></h1>
    <form id="report-form" method="post" enctype="multipart/form-data">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="ai_object">Centrum handlowe</label><br>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="ai_object" id="ai_alfa" value="Alfa Centrum">
            <label class="form-check-label" for="ai_alfa">
              Alfa Centrum
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="ai_object" id="ai_karolinka" value="CH Karolinka">
            <label class="form-check-label" for="ai_karolinka">
              CH Karolinka
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="ai_object" id="ai_platan" value="CH Platan">
            <label class="form-check-label" for="ai_platan">
              CH Platan
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="ai_object" id="ai_pogoria" value="CH Pogoria">
            <label class="form-check-label" for="ai_pogoria">
              CH Pogoria
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="ai_object" id="ai_fmpt" value="Focus Mall Piotrków Trybunalski">
            <label class="form-check-label" for="ai_fmpt">
              Focus Mall Piotrków Trybunalski
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="ai_object" id="ai_fmzg" value="Focus Mall Zielona Góra">
            <label class="form-check-label" for="ai_fmzg">
              Focus Mall Zielona Góra
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="ai_object" id="ai_tomaszow" value="Galeria Tomaszów">
            <label class="form-check-label" for="ai_tomaszow">
              Galeria Tomaszów
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="ai_object" id="ai_wolomin" value="Galeria Wołomin">
            <label class="form-check-label" for="ai_wolomin">
              Galeria Wołomin
            </label>
          </div>
        </div>
        <div class="form-group col-md-6">
          <label for="ai_dateFrom">Przedział czasowy</label><br>
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
        <button class="btn btn-primary" id="ai-generate">Wygeneruj</button>
        <button class="btn btn-warning" id="ai-download">Pobierz</button>
      </div>

      <div class="form-group text-center">
        <span id="ai-alert" class="text-center"></span>
      </div>

      <div class="row" id="results"></div>

    </form>
  </div>
</main>

<?php get_footer(); ?>
