<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
include_once "shortcode.php";

include_once "constant.php";

define("MMC_CATEGORY_API_URL", MMC_BASE_API_URL . '/rest/getCategoryList?authToken=' . get_option('muvi_auth_token'));

add_action('init', 'mmc_shortcode_content');


add_action("admin_menu", "muvi_media_connect_menu");

function muvi_media_connect_render_setup_page() {
    include_once "setup.php";
}

function muvi_media_connect_cgb_block_assets() { // phpcs:ignore

    // Define $muvibearer_token with a default value.
    $muvibearer_token = '';

    //Here let's fetch all root categories
    if (get_option('muvi_auth_pass') != '') {

		//Product specify for connect to the right product
		$muvi_products = 'muvi 6';

		//Muvi 6 url
		$muviurl = "/get-user-token-details";

		//Muvi 6 product url
		$muviproducturl = "/content";
		
		//Response of token
		$response = wp_remote_post(MMC_FLEX_BASE_API_URL.$muviurl,array(
			'method' => 'POST',
			'body' => array(
				'app_id' => get_option('muvi_app_id'),
				'secret_key' => get_option('muvi_auth_pass')
			),
		));

		if (is_wp_error($response)) {
            error_log('Muvi API error: ' . $response->get_error_message());
            return;
        }

        $cc = wp_remote_retrieve_body($response);

        $json = json_decode($cc, true);

        // $muvibearer_token = $json['response'];

        // $muvibearer_token = $muvibearer_token['access_token'];

		if (isset($json['response']) && isset($json['response']['access_token'])) {
            $muvibearer_token = $json['response']['access_token'];
        } else {
            error_log('Muvi API error: Invalid response format');
            return;
        }

		if(get_option('muvi_product') === 'Muvi Live'){

			$json_string = '{"code": 200,"status": "SUCCESS","message": "Fetched Successfully","data": {"categoryList": {"page_info": {"total_count": 1},"category_list": [{"category_uuid": "9610826d621440d2a6d1892383bc91e4live","category_name": "Live","category_parent_uuid": "0","sub_category": null}]}}}';
			
			$category_list = json_decode($json_string, true);
			
			$cat_list = $category_list['data'];

			$cat_list = $cat_list['categoryList'];

			$cat_list = $cat_list['category_list'];
			
		}else{
			//Product category of contents
			$category_response = wp_remote_post(MMC_FLEX_BASE_API_URL.$muviproducturl,array(
				'method' => 'POST',
				'headers' => array(
					'Authorization' => 'Bearer ' . $muvibearer_token ,
				),
				'body' => array(
					'query' => "{categoryList(app_token:\":app_token\",product_key:\":product_key\",category_parent_uuid:\"0\",page:1,per_page:10) {page_info{total_count} category_list{category_uuid category_name category_parent_uuid sub_category {category_uuid category_name category_parent_uuid }}}}"
				),
			));

			// print_r($category_response); exit;
			$category_list = wp_remote_retrieve_body($category_response);
			// print_r($category_list); exit;
			$cat_list = json_decode($category_list, true);

			$cat_list = $cat_list['data'];

			$cat_list = $cat_list['categoryList'];

			$cat_list = $cat_list['category_list'];

		}

    } else {
		//Product specify for connect to the right product
		$muvi_products = 'muvi 5';

		//Product category of contents
		$category_response = wp_remote_get(MMC_CATEGORY_API_URL);
		// print_r($category_response); exit;
		$category_list = wp_remote_retrieve_body($category_response);
		// print_r($category_list); exit;
		$cat_list = json_decode($category_list, true);

		$cat_list = $cat_list['category_list'];

    }
    
    	// Register block styles for both frontend + backend.
	wp_register_style(
		'muvi_media_connect-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'muvi_media_connect-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'muvi_media_connect-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

    // WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
    wp_localize_script(
        'muvi_media_connect-cgb-block-js',
        'cgbGlobal', // Array containing dynamic data for a JS Global.
        [
            'pluginDirPath' => plugin_dir_path(__DIR__),
            'pluginDirUrl'  => plugin_dir_url(__DIR__),
            // Add more data here that you want to access from `cgbGlobal` object.
            'app_id' => get_option('muvi_app_id'),
            'auth_token' => get_option('muvi_auth_token'),
            'auth_secret' => get_option('muvi_auth_pass'),
            'height' => get_option('muvi_height'),
            'width' => get_option('muvi_width'),
            'audio_height' => get_option('muvi_audio_height'),
            'audio_width' => get_option('muvi_audio_width'),
            'categories' => $cat_list,
            'muvi_products' => $muvi_products,
            'muvibearer_token' => $muvibearer_token,
            'muvi_flex_api_url' => MMC_FLEX_BASE_API_URL,
            'muvi_api_url' => MMC_BASE_API_URL,
        ]
    );

 	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
	    	'cgb/block-muvi-media-connect', array(
		// Enqueue blocks.style.build.css on both frontend & backend.
		'style'         => 'muvi_media_connect-cgb-style-css',
		// Enqueue blocks.build.js in the editor only.
		'editor_script' => 'muvi_media_connect-cgb-block-js',
		// Enqueue blocks.editor.build.css in the editor only.
		'editor_style'  => 'muvi_media_connect-cgb-block-editor-css',
	    	)
	);

}

// Hook: Block assets.
add_action( 'init', 'muvi_media_connect_cgb_block_assets' );

function muvi_media_connect_render_settings_page(){
	
}

function muvi_media_connect_menu() {
    add_menu_page('Muvi', 'Muvi', 'manage_options', 'Muvi', "muvi_media_connect_render_settings_page", plugin_dir_url(__FILE__). '/images/muvil.svg', 4);
    add_submenu_page('Muvi', 'setup', 'setup', 'manage_options', 'Muvi', "muvi_media_connect_render_setup_page");
}

/**
 * Redirect to Muvi menu after plugin activation.
 */
function muvi_media_connect_redirect_after_activation() {
	// Replace 'muvi' with the slug of your Muvi menu page.
	$muvi_menu_slug = 'Muvi';
	$redirect_to = admin_url( 'admin.php?page=' . $muvi_menu_slug );
	wp_safe_redirect( $redirect_to );
	exit;
}
add_action( 'activated_plugin', 'muvi_media_connect_redirect_after_activation' );