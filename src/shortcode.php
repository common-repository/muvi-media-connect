<?php

include_once plugin_dir_path(__FILE__) . 'constant.php';

function mmc_shortcode_content() {
    
    add_shortcode('muvimedia', 'get_muvi_media_connect_content_list');
    add_shortcode('muvimediaflex', 'get_muvi_media_flex_connect_content_list');
    add_shortcode('muvimedialive', 'get_muvi_media_live_connect_content_list');

    function get_muvi_media_connect_content_list($attr) {
        
        $attrs = shortcode_atts(array(
            'permalink' => 'default',
            'language' => 'en',
            'height' => 'default',
            'width' => 'default',
            'hasepisodes' => 'default',
            'episode_sequences' => 'default',
            'src' => ''
        ), $attr, 'getcontent');

        return muvi_media_connect_contentlist($attrs);
    }

    function get_muvi_media_flex_connect_content_list($attr) {
        
        $attrs = shortcode_atts(array(
            'permalink' => 'default',
            'language' => 'en',
            'height' => 'default',
            'width' => 'default',
            'hasepisodes' => 'default',
            'episode_sequences' => 'default',
            'src' => ''
        ), $attr, 'getcontent');

        return muvi_media_flex_connect_contentlist($attrs);
    }

    function get_muvi_media_live_connect_content_list($attr) {
        
        $attrs = shortcode_atts(array(
            'permalink' => 'default',
            'language' => 'en',
            'height' => 'default',
            'width' => 'default',
            'hasepisodes' => 'default',
            'episode_sequences' => 'default',
            'src' => ''
        ), $attr, 'getcontent');

        return muvi_media_live_connect_contentlist($attrs);
    }

}

function muvi_media_live_connect_contentlist($attrs) {

    $perma = sanitize_text_field($attrs['permalink']);
    $lang = sanitize_text_field($attrs['language']);
    $height = sanitize_text_field($attrs['height']);
    $width = sanitize_text_field($attrs['width']);
    $episode = sanitize_text_field($attrs['hasepisodes']);
    $episode_sequences = sanitize_text_field($attrs['episode_sequences']);
    $src = sanitize_text_field($attrs['src']);

    // if ($height == 'default') {
    //     $saved_height = get_option('height');
    //     if ($saved_height) {
    //         $height = $saved_height;
    //     } else {
    //         $height = '320';
    //     }
    // }

    if ($height == 'default') {
        $saved_height = get_option('height');
        $height = $saved_height ? $saved_height : '320';
    }

    $iframes = ''; // Initialize the variable to avoid undefined variable warning

    if($perma == 'audio'){
        $iframes .= "<li style='list-style-type: none;'>"
        . "$src"
        . "</li>";
    }else{
        $iframes .= "<li style='list-style-type: none;'>"
        . "<iframe width ='$width'  height = '$height'  style='background-color:#000' src ='$perma' frameborder = 0 allowfullscreen allow='encrypted-media'></iframe>"
        . "</li>";
    }

    return $iframes;
}

function muvi_media_flex_connect_contentlist($attrs) {

    $perma = sanitize_text_field($attrs['permalink']);
    $lang = sanitize_text_field($attrs['language']);
    $height = sanitize_text_field($attrs['height']);
    $width = sanitize_text_field($attrs['width']);
    $episode = sanitize_text_field($attrs['hasepisodes']);
    $episode_sequences = sanitize_text_field($attrs['episode_sequences']);
    $src = sanitize_text_field($attrs['src']);

    if ($height == 'default') {
        $saved_height = get_option('height');
        $height = $saved_height ? $saved_height : '320';
    }

    $iframes = ''; // Initialize the variable to avoid undefined variable warning


    if($perma == 'audio'){
        $iframes .= "<li style='list-style-type: none;'>"
        . "$src"
        . "</li>";
    }else{
        $iframes .= "<li style='list-style-type: none;'>"
        . "<iframe width ='$width'  height = '$height'  style='background-color:#000' src ='$perma' frameborder = 0 allowfullscreen allow='encrypted-media'></iframe>"
        . "</li>";
    }

    return $iframes;
}

function muvi_media_connect_contentlist($attrs) {

    $perma = sanitize_text_field($attrs['permalink']);
    $lang = sanitize_text_field($attrs['language']);
    $height = sanitize_text_field($attrs['height']);
    $width = sanitize_text_field($attrs['width']);
    $episode = sanitize_text_field($attrs['hasepisodes']);
    $episode_sequences = sanitize_text_field($attrs['episode_sequences']);

    if ($height == 'default') {
        $saved_height = get_option('height');
        $height = $saved_height ? $saved_height : '320';
    }

    if ($width == 'default') {
        $saved_width = get_option('width');
        $width = $saved_width ? $saved_width : '320';
    }
    
    if ($perma == 'default') {
        return __('This shortcode will not work as you have not provided the permalink.  Please provide the content shortcode.');
    } else {
        $auth = get_option('muvi_auth_token');
        if ($episode == 'yes') {
            $episodeDetails = wp_remote_get(MMC_BASE_API_URL . '/rest/episodeDetails?authToken=' . $auth . '&permalink=' . $perma . '&language=' . $lang);
            $json = json_decode($episodeDetails['body'], true);
            $code = $json['code'];
            if ($code == '200') {
                if (!empty($json['episode'])) {
                    $iframes = "<div class='muvi-parent-wraper'><ul class='muvi-list'>";
                    $seq = 1;
                    foreach ($json['episode'] as $key => $episode_details) {
                        if ($episode_sequences == 'default') {
                            $iframes .= "<li>"
                                    . "<iframe width ='$width'  height = '$height'  style='background-color:#000' src ='https://muvi2434.muvi.com/embed/59652cb2e99b2563d15e463e841a36b3' frameborder = 0 allowfullscreen allow='encrypted-media'></iframe>"
                                    . "</li>";
                        } else {
                            $episode_sequences_arr = explode(',', $episode_sequences);
                            if (in_array($seq, $episode_sequences_arr)) {
                                $iframes .= "<li>"
                                        . "<iframe width ='$width'  height = '$height'  style='background-color:#000' src ='https://muvi2434.muvi.com/embed/59652cb2e99b2563d15e463e841a36b3' frameborder = 0 allowfullscreen allow='encrypted-media'></iframe>"
                                        . "</li>";
                            }
                        }
                        $seq++;
                    }
                    $iframes .= "</ul><div style='clear:both;'></div></div>"
                            . "<style type='text/css'>"
                            . ".muvi-list{"
                            . "list-style:none;"
                            . "}"
                            . ".muvi-list li{"
                            . "float:left;"
                            . "padding:0px 0px 5px 5px;"
                            . "}"
                            . ".muvi-parent-wraper{"
                            . "max-width:100% !important;"
                            . "}"
                            . "</style>";
                    return $iframes;
                } else {
                    return __('No episode found');
                }
            } else {
                return __('This shortcode will not work as you have not provided the correct permalink.  Please provide a correct permalink in content shortcode.');
            }
        } else {
            $responce = wp_remote_get(MMC_BASE_API_URL . '/rest/GetContentDetails?authToken=' . $auth . '&permalink=' . $perma . '&language=' . $lang);
            $json = json_decode($responce['body'], true);
            $code = $json['code'];
            if ($code == '200') {
                $movie = $json['movie'];
                $emb = $movie['embeddedUrl'];
                $embde_iframe = '<iframe width =' . $width . '  height = ' . $height . '  style="background-color:#000" src =' . $emb . ' frameborder = "0" allowfullscreen allow="encrypted-media"> </iframe>';
                return $embde_iframe;
            } else {
                return __('This shortcode will not work as you have not provided the correct permalink.  Please provide a correct permalink in content shortcode.');
            }
        }
    }
}
