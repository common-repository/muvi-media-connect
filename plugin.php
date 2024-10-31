<?php
/**
 * Plugin Name: muvi-media-connect
 * Plugin URI: https://wordpress.org/plugins/muvi-media-connect/
 * Description: A Muvi plugin to power your WordPress website with Muvi, the world's most customizable white label Multi-Device Video Streaming Platform supporting Video-On-Demand and live streaming for both video and audio contents.
 * Author: Muvi
 * Author URI: https://www.muvi.com/help/how-to-use-muvi-wordpress-media-plugin.html
 * Version: 1.1.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
