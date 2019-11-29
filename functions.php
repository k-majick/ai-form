<?php
require get_template_directory() . '/assets/inc/enqueue.php';

// enable HTML formatting
function ai_mail_content_type() {
  return "text/html";
}
add_filter("wp_mail_content_type", "ai_mail_content_type");

// generate report from db
function generate_report() {
  global $wpdb;
  $table_name = $wpdb->prefix . 'customer_posts';
  $object_name = wp_strip_all_tags($_POST['ai_object']);
  $dateFromRaw = wp_strip_all_tags($_POST['ai_dateFrom']);
  $dateToRaw = wp_strip_all_tags($_POST['ai_dateTo']);
  $dateFrom = $dateFromRaw . ' 00:00:01';
  $dateTo = $dateToRaw . ' 00:00:01';
  $queryStr = "SELECT * FROM {$table_name}
   WHERE object_name = '{$object_name}'
   AND time_stamp BETWEEN '{$dateFrom}' AND '{$dateTo}'
   ORDER BY time_stamp ASC
  ";
  $res = $wpdb->get_results($queryStr);
  return array($res, $dateFromRaw, $dateToRaw);
}

// show report in table
function show_report() {
  $res = generate_report();
  echo '<div class="col-md-12 text-center">Raport od ' . $res[1] . ' do ' . $res[2] . "</p>";
  $txt = '<table id="report_table"><thead><tr>
  <td>ID</td>
  <td>Centrum handlowe</td>
  <td>Tytuł</td>
  <td>Termin publikacji</td></thead><tbody>';
  echo $txt;
  foreach($res[0] as $row) { ?>

  <tr>
   <td><?php echo $row->id; ?></td>
   <td><?php echo $row->object_name; ?></td>
   <td><?php echo $row->post_title; ?></td>
   <td><?php echo $row->date_from; ?> - <?php echo $row->date_to; ?></td>
  </tr>

<?php }
  echo '</tbody></table>';
  die();
}
add_action('wp_ajax_show_report', 'show_report');
add_action('wp_ajax_nopriv_show_report', 'show_report');


// ai_form
function send_ai_form() {

  // add to db
  global $wpdb;
  $table_name = $wpdb->prefix . 'customer_posts';
  $object_names = wp_strip_all_tags($_POST['ai_object']);
  $post_title = wp_strip_all_tags($_POST['ai_title']);
  $post_content = wp_strip_all_tags($_POST['ai_content']);
  $email_from = wp_strip_all_tags($_POST['ai_email']);
  $date_from = wp_strip_all_tags($_POST['ai_dateFrom']);
  $date_to = wp_strip_all_tags($_POST['ai_dateTo']);
  $objects_arr = explode(',', $object_names);
  $format = array(
    '%s',
    '%s'
  );
  foreach($objects_arr as $object) {
    $arr = array();
    $arr['object_name'] = $object;
    $arr['vendor_email'] = $email_from;
    $arr['post_title'] = $post_title;
    $arr['post_content'] = $post_content;
    $arr['date_from'] = $date_from;
    $arr['date_to'] = $date_to;
    $wpdb->insert($table_name, $arr, $format);
  }

  if (!function_exists('wp_handle_upload')) {
    require_once (ABSPATH . 'wp-admin/includes/file.php');
  }

  if($_SERVER['REQUEST_METHOD'] == "POST") {
    $eol =  PHP_EOL;
    $uid = md5(uniqid(time()));
    $to = wp_strip_all_tags($_POST['ai_sendTo']);
    $subject = 'Prośba o zamieszczenie wpisu';
    $fileCount = count($_FILES['ai_upload']['name']) + count($_FILES['ai_uploadPdf']['name']);
    $header = 'From: ' . wp_strip_all_tags($_POST["ai_email"]) . $eol;
    $header .= 'Bcc: ' . wp_strip_all_tags($_POST["ai_sendBcc"]) . $eol;

    $msg  = '<p>Otrzymano nową prośbę o zamieszczenie wpisu od najemcy <strong>' . wp_strip_all_tags($_POST['ai_name']) . '</strong>.</p>' . $eol;
    $msg .= '<h4 style="display: inline;">Centrum handlowe:&nbsp;</h4>' . wp_strip_all_tags($_POST['ai_object']) . '<br>' . $eol;
    $msg .= '<h4 style="display: inline;">E-mail najemcy:&nbsp;</h4>' . wp_strip_all_tags($_POST['ai_email']) . '<br>' . $eol;
    $msg .= '<h4 style="display: inline;">Kategoria wpisu:&nbsp;</h4>' . wp_strip_all_tags($_POST['ai_category']) . '<br>' . $eol;
    if (!empty($_POST['ai_dateFrom'])) {
      $msg .= '<h4 style="display: inline;">Termin publikacji od:&nbsp;</h4>' . wp_strip_all_tags($_POST['ai_dateFrom']) . '<br>' . $eol;
    }
    if (!empty($_POST['ai_dateTo'])) {
      $msg .= '<h4 style="display: inline;">Termin publikacji do:&nbsp;</h4>' . wp_strip_all_tags($_POST['ai_dateTo']) . '<br>' . $eol;
    }
    $msg .= '<h4 style="display: inline;">Liczba załączników:&nbsp;</h4>' . $fileCount . '<br>';
    $msg .= '<h4 style="display: inline;">Tytuł wpisu:&nbsp;</h4>' . wp_strip_all_tags($_POST['ai_title']) . '<br>' . $eol;
    if (!empty($_POST['ai_lead'])) {
      $msg .= '<h4 style="display: inline;">Lead/zajawka:&nbsp;</h4><p>' . wp_strip_all_tags($_POST['ai_lead']) . '<p>' . $eol;
    }
    $msg .= '<h4 style="display: inline;">Treść wpisu:&nbsp;</h4><p>' . wp_strip_all_tags($_POST['ai_content']) . '</p>' . $eol;

    $attachments = array();
    $files = $_FILES['ai_upload'];
    $pdfs = $_FILES['ai_uploadPdf'];
    $upload_overrides = array(
      'test_form' => false
    );
    foreach ($files['name'] as $i => $value) {
      if ($files['name'][$i]) {
        $file = array(
          'name' => $files['name'][$i],
          'type' => $files['type'][$i],
          'tmp_name' => $files['tmp_name'][$i],
          'error' => $files['error'][$i],
          'size' => $files['size'][$i]
        );
        $movefile = wp_handle_upload($file, $upload_overrides);
        $attachments[] = $movefile['file'];
      }
    }
    foreach ($pdfs['name'] as $i => $value) {
      if ($pdfs['name'][$i]) {
        $pdf = array(
          'name' => $pdfs['name'][$i],
          'type' => $pdfs['type'][$i],
          'tmp_name' => $pdfs['tmp_name'][$i],
          'error' => $pdfs['error'][$i],
          'size' => $pdfs['size'][$i]
        );
        $movepdf = wp_handle_upload($pdf, $upload_overrides);
        $attachments[] = $movepdf['file'];
      }
    }

    $body .= $msg . $eol . $eol;
    $send_mail = wp_mail($to, $subject, $body, $header, $attachments);
    $body .= '--' . $uid . '--';
  }
  exit();
}
add_action('wp_ajax_send_ai_form', 'send_ai_form');
add_action('wp_ajax_nopriv_send_ai_form', 'send_ai_form');
// remove_filter('wp_mail_content_type','ai_mail_content_type');


function send_manager_form() {
  if (!function_exists('wp_handle_upload')) {
    require_once (ABSPATH . 'wp-admin/includes/file.php');
  }
  if($_SERVER['REQUEST_METHOD'] == "POST") {

    $eol =  PHP_EOL;
    $uid = md5(uniqid(time()));
    $to = wp_strip_all_tags($_POST['ai_sendTo']);
    // $to = 'm.klimowicz@adprime.pl';
    $subject = 'Wiadomość od managera';
    $fileCount = count($_FILES['ai_upload']['name']);
    $header  = 'From: ' . strip_tags($_POST["ai_email"]) . $eol;

    $msg  = '<p>Otrzymano nową wiadomość od managera.</p>' . $eol;
    $msg .= '<h4 style="display: inline;">Centrum handlowe:&nbsp;</h4>' . wp_strip_all_tags($_POST['ai_object']) . '<br>' . $eol;
    $msg .= '<h4 style="display: inline;">E-mail managera:&nbsp;</h4>' . wp_strip_all_tags($_POST['ai_email']) . '<br>' . $eol;
    $msg .= '<h4 style="display: inline;">Liczba załączników:&nbsp;</h4>' . $fileCount . '<br>';
    $msg .= '<h4 style="display: inline;">Wiadomość:&nbsp;</h4><p>' . wp_strip_all_tags($_POST['ai_content']) . '</p>' . $eol;

    $attachments = array();
    $files = $_FILES['ai_upload'];
    $upload_overrides = array(
      'test_form' => false
    );
    foreach ($files['name'] as $i => $value) {
      if ($files['name'][$i]) {
        $file = array(
          'name' => $files['name'][$i],
          'type' => $files['type'][$i],
          'tmp_name' => $files['tmp_name'][$i],
          'error' => $files['error'][$i],
          'size' => $files['size'][$i]
        );
        $movefile = wp_handle_upload($file, $upload_overrides);
        $attachments[] = $movefile['file'];
      }
    }

    $body .= $msg . $eol . $eol;
    $send_mail = wp_mail($to, $subject, $body, $header, $attachments);
    $body .= '--' . $uid . '--';
  }
  exit();
}
add_action('wp_ajax_send_manager_form', 'send_manager_form');
add_action('wp_ajax_nopriv_send_manager_form', 'send_manager_form');

// dashicons
function load_dashicons_front_end() {
  wp_enqueue_style('dashicons');
}
add_action('wp_enqueue_scripts', 'load_dashicons_front_end');

// navwalker
require_once('wp_bootstrap_navwalker.php');

// menu
function register_ba_navigation() {
  $locations = array(
    'header-menu' => __('Header Menu', 'Demo'),
  );
  register_nav_menus( $locations );
}
add_action('init', 'register_ba_navigation');

// add class to menu item link
function add_specific_menu_location_atts( $atts, $item, $args ) {
    // check if the item is in the primary menu
    if( $args->theme_location == 'main_menu' ) {
      // add the desired attributes:
      $atts['class'] = 'navItem__link';
    }
    return $atts;
}
add_filter( 'nav_menu_link_attributes', 'add_specific_menu_location_atts', 10, 3 );
