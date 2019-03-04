<?php
/**
* Plugin Name: Top Hat Notifications
* Version: 0.02
* Author: Glacial Multimedia
* License: GPL2
* License URI: https://www.gnu.org/licenses/gpl-2.0.html
* Top Hat Notifications is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 2 of the License, or
* any later version.
*
* Top Hat Notifications is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with Top Hat Notifications. If not, see {License URI}.
*
*/
  add_action( 'admin_init', 'thn_settings' );
  add_action( 'admin_menu', 'thn_settings_add_page' );
  add_action( 'wp_enqueue_scripts', 'top_hat_enqueue_scripts' );
  function top_hat_enqueue_scripts() {
    wp_enqueue_script('top-hat', plugins_url( 'res/js/tophat.js', __FILE__ ), array('jquery'));

    $thn_text = get_option('thn_text');
    $top_hat_settings = array(
      'thn_text' => $thn_text
      );

    wp_localize_script('top-hat', 'top_hat_settings', $top_hat_settings );
  }
  function thn_settings() {
    register_setting( 'thn-settings', 'thn_text' );
  }
  function thn_settings_add_page() {
    add_menu_page(
      'Top Hat Notification Settings', // Name of Menu item
      'Top Hat Notification Settings', // Title
      'administrator', //displays menu if user can do this.
      'thn_settings', //
      'top_hat_settings_page',
      '', // TODO add logo/icon for settings
      6 //Currently right after posts
    );
  }

  function top_hat_settings_page() {
    ?>
    <div class="wrap">
      <h2>Top Hat Notification Settings</h2>
      <div>Here you can configure the options for the Top Hat Notification System</div>
      <form method="post" action="options.php">
        <?php settings_fields( 'thn-settings' ); ?>
        <?php do_settings_sections( 'thn-settings' ); ?>
        <h5>Top Bar Text</h5>
        <input type="text" placeholder="Top bar text" name="thn_text" value="<?php echo esc_attr( get_option( 'thn_text' ) ); ?>">
        <?php submit_button(); ?>
      </form>
      <div class="thn-foot">Plugin built with love by <a href="http://glacial.com/" target="_blank" rel="noopener">Glacial Multimedia</a></div>
    </div>
    <?php
  }

  // function top_hat_shortcodes() { //This all might not be necessary
  //   function top_hat_shortcode() {
  //
  //   }
  //   add_shortcode( 'top_hat_bar', 'top_hat_shortcode' );
  // }
  // add_action( 'init', 'top_hat_shortcodes' );
?>