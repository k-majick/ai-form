<?php
if (!function_exists('theme_scripts')) {
	function theme_scripts() {
		$the_theme = wp_get_theme();
		// core
    wp_deregister_script('jquery');
		wp_enqueue_script('jquery', '//code.jquery.com/jquery-3.4.0.min.js', array(), false, true);
    wp_enqueue_script('jquery-easing', '//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js', array('jquery'), null, false);
		wp_enqueue_script('jquery-ui', '//code.jquery.com/ui/1.12.1/jquery-ui.min.js', array('jquery'), null, false);

		if (is_page( 'Formularz dla managera' )) {
			wp_enqueue_script('theme-js', get_template_directory_uri() . '/assets/manager.min.js', array(), $the_theme->get('Version'), true);
		} else if (is_page( 'Raport' )) {
			wp_enqueue_script('theme-js', get_template_directory_uri() . '/assets/raport.min.js', array(), $the_theme->get('Version'), true);
		} else {
			wp_enqueue_script('theme-js', get_template_directory_uri() . '/assets/main.min.js', array(), $the_theme->get('Version'), true);
		}

		wp_enqueue_script('tether', '//cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js', array('jquery'), null, false);
		wp_enqueue_script('validate', '//ajax.aspnetcdn.com/ajax/jquery.validate/1.11.0/jquery.validate.min.js', array('jquery'), null, false);
		wp_enqueue_script('validate-extra', '//ajax.aspnetcdn.com/ajax/jquery.validate/1.11.0/additional-methods.js', array('jquery'), null, false);

    // styles
		wp_enqueue_style('theme-css', get_stylesheet_directory_uri() . '/assets/main.min.css', array(), $the_theme->get('Version'));
		wp_enqueue_style('jquery-ui-css', '//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css', array(), null, false);
	}
}
add_action( 'wp_enqueue_scripts', 'theme_scripts' );
