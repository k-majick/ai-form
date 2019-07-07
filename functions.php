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
    $arr['post_title'] = $post_title;
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
    // $to = 'm.klimowicz@adprime.pl';
    $subject = 'Prośba o zamieszczenie wpisu';
    $fileCount = count($_FILES['ai_upload']['name']);
    $header  = 'From: ' . strip_tags($_POST["ai_email"]) . $eol;

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

// pagination
function pagination($pages = '', $range = 4) {
  $showitems = ($range * 2)+1;
  global $paged;
  if(empty($paged)) $paged = 1;
  if($pages == '') {
    global $wp_query;
    $pages = $wp_query->max_num_pages;
    if(!$pages) {
      $pages = 1;
    }
  }
  if(1 != $pages) {
    echo "<ul class=\"pagination\">";
    if($paged > 2 && $paged > $range+1 && $showitems < $pages) echo "<li><a href='".get_pagenum_link(1)."'>&laquo; First</a></li>";
    if($paged > 1 && $showitems < $pages) echo "<li><a href='".get_pagenum_link($paged - 1)."'>&lsaquo; Previous</a></li>";
    for ($i=1; $i <= $pages; $i++) {
      if (1 != $pages &&( !($i >= $paged+$range+1 || $i <= $paged-$range-1) || $pages <= $showitems )) {
        echo ($paged == $i)? "<li class='active'><span class='current'>".$i."</span></li>":"<li><a href='".get_pagenum_link($i)."' class=\"inactive\">".$i."</a></li>";
      }
    }
    if ($paged < $pages && $showitems < $pages) echo "<li><a href=\"".get_pagenum_link($paged + 1)."\">Next &rsaquo;</a></li>";
    if ($paged < $pages-1 &&  $paged+$range-1 < $pages && $showitems < $pages) echo "<li><a href='".get_pagenum_link($pages)."'>Last &raquo;</a></li>";
    echo "</ul>\n";
  }
}

// slug
function the_slug() {
  $post_data = get_post($post->ID, ARRAY_A);
  $slug = $post_data['post_name'];
  return $slug;
}

// lead
function first_paragraph($content)
{
  $page = get_query_var('page');
  if ($page < 2) {
    return preg_replace('/<p([^>]+)?>/', '<p$1 class="lead">', $content, 1);
  }
  else {
    return $content;
  }
}
add_filter('the_content', 'first_paragraph');

// thumbnails
if ( function_exists( 'add_theme_support' ) ) {
  add_theme_support( 'post-thumbnails' );
  set_post_thumbnail_size( 300, 300, true );
}
if ( function_exists( 'add_image_size' ) ) {
  add_image_size( 'list', '150', '150', true );
  add_image_size( 'post', '200', '200', true );
  add_image_size( 'index', '300', '300', true );
  add_image_size( 'feat', '400', '480', true );
  add_image_size( 'album', '800', '600', true );
  add_image_size( 'slide', '1920', '480', true );
  add_image_size( 'service', '800', '400', true );
}

// excerpts
function youth_excerpt($length = '', $more = ''){
  global $post;
  if (function_exists($length)) {
    add_filter('excerpt_length', $length);
  }
  if (function_exists($more)) {
    add_filter('excerpt_more', $more);
  }
  $output = get_the_excerpt();
  $output = apply_filters('wptexturize', $output);
  $output = apply_filters('convert_chars', $output);
  $output = '<p>' . $output . '</p>';
  echo $output;
}
function youth_excerpt_index($length) {
  return 50;
}
function youth_excerpt_report($length) {
  return 50;
}
function youth_excerpt_more($more) {
  return ' <a class="more-link" href="' . get_permalink($post->ID) . '">' . __('... Czytaj dalej &raquo;', '4youth') . '</a>';
}

// widget
if ( function_exists('register_sidebar') )
  register_sidebar(array(
    'before_widget' => '<ul><li>',
    'after_widget' => '</li></ul>',
    'before_title' => '<h3>',
    'after_title' => '</h3>',
  ));

// admin
show_admin_bar( false );
