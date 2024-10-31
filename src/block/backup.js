/* eslint-disable react/no-unescaped-entities */
/**
 * BLOCK: muvi-media-connect
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './fancybox.pack';
import './style.scss';
import { Modal, Button, TabPanel } from '@wordpress/components';
import { useState } from '@wordpress/element';

const { RawHTML } = wp.element;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const axios = require( 'axios' ).default;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'muvi-media-connect/block-muvi-media-connect', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'muvi-media-connect' ), // Block title.
	icon: <svg width="20" height="20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">
		<path d="M15.777,107.754c0-4.511,0-9.022,0-13.533c0.195-1.088,0.521-2.171,0.563-3.265
	c0.381-9.705,0.463-19.427,1.124-29.111c0.687-10.068,1.7-20.127,2.983-30.137c1.008-7.869,3.767-15.071,10.599-19.945
	c1.095-0.781,2.632-1.028,3.563-1.935c2.588-2.519,5.854-3.162,9.155-3.85c0.833-0.173,1.643-0.459,2.464-0.695
	c0.967,0,1.934,0,2.901,0c0.838,0.229,1.672,0.479,2.517,0.682c3.188,0.766,6.616,1.009,9.522,2.369
	c7.922,3.708,15.643,7.852,23.392,11.92c0.938,0.493,0.938,0.493,2.285,1.381c1.879,1.005,2.267,1.363,3.301,1.896
	c2.212,1.137,4.327,2.464,6.46,3.75c11.939,7.193,23.932,14.296,35.779,21.637c6.409,3.973,12.56,8.369,18.841,12.554
	c4.533,3.022,9.221,5.837,13.599,9.071c3.327,2.46,6.369,5.336,9.372,8.204c5.079,4.851,9.028,10.454,10.775,17.398
	c0.287,1.138,0.632,2.263,0.948,3.395c0,0.644,0,1.289,0,1.933c-0.332,1.482-0.637,2.969-1,4.442
	c-1.373,5.588-4.348,10.297-8.102,14.56c-2.799,3.177-3.489,3.3-7.052,0.986c-3.834-2.487-7.558-5.153-11.425-7.593
	c-4.648-2.939-9.445-5.647-14.092-8.592c-8.48-5.376-16.87-10.897-25.349-16.279c-12.447-7.899-24.927-15.748-37.42-23.572
	c-2.722-1.704-5.462-3.441-8.373-4.767c-5.533-2.521-13.792-0.311-16.803,4.301c-4.458,6.83-3.805,13.521,1.227,18.466
	c3.773,3.709,8.48,6.512,12.944,9.458c3.273,2.161,6.897,3.783,10.235,5.854c4.171,2.588,8.162,5.461,12.313,8.083
	c5.722,3.609,11.57,7.02,17.269,10.664c7.225,4.615,14.308,9.45,21.537,14.057c4.509,2.876,9.182,5.487,13.755,8.252
	c1.137,0.688,2.187,1.519,3.26,2.27c-0.229,0.369-0.278,0.557-0.402,0.634c-8.617,5.488-17.227,10.986-25.896,16.391
	c-0.53,0.33-1.691,0.15-2.295-0.22c-7.227-4.441-14.417-8.945-21.592-13.471c-7.745-4.884-15.55-9.681-23.171-14.755
	c-5.851-3.894-18.491-2.445-21.268,7.352c-1.512,5.34-0.435,12.463,5.056,16.384c2.964,2.116,6.26,3.765,9.351,5.714
	c6.436,4.06,12.835,8.174,19.25,12.266c1.786,1.138,3.575,2.272,5.662,3.601c-1.244,0.988-2.195,1.982-3.344,2.62
	c-6.961,3.862-13.946,7.688-20.966,11.439c-4.886,2.61-9.892,4.932-15.479,5.686c-1.398,0.188-2.758,0.652-4.136,0.99
	c-0.966,0-1.933,0-2.899,0c-1.391-0.29-2.779-0.597-4.174-0.87c-7.485-1.462-12.759-5.808-17.12-11.981
	c-2.081-2.945-3.366-5.934-4.125-9.279c-2.797-12.339-3.528-24.937-4.251-37.506c-0.508-8.823-0.461-17.675-0.708-26.515
	C16.31,109.607,15.971,108.684,15.777,107.754z"></path>
	</svg>, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'media', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'muvi-media-connect — Muvi Media Connect' ),
		__( 'Muvi Media Connect' ),
		__( 'muvi-media-connect' ),
	],
	attributes: {
		movie: {
			type: 'array',
		},
		lengthOfMuvi: {
			type: 'integer',
		},
		categoryList: {
			type: 'array',
		},
		cssClassReplace: {
			type: 'string',
		},
		shortCode: {
			type: 'string',
		},
		selectOrNot: {
			type: 'string',
		},
		selectedProp: {
			type: 'array',
			default: [],
		},
		selectContentType:{
			type: 'string',
		},
		appId:{
			type: 'string',
		},
		authToken: {
			type: 'string',
		},
		authPass: {
			type: 'string',
		},
		muviHeight: {
			type: 'integer',
		},
		muviWidth: {
			type: 'integer',
		},
		muviAudioHeight: {
			type: 'integer',
		},
		muviAudioWidth: {
			type: 'integer',
		},
		selectStatus: {
			type: 'integer',
		},
		muviProductSelected: {
			type: 'string',
		},
		muviBearerToken: {
			type: 'string',
		},
		muviCategoryUuid: {
			type: 'string',
		},
		indexedValue: {
			type: 'integer',
		},
		buttonEnable: {
			type: 'string',
		},
		selectedTab: {
			typr: 'string',
		},
		muviApiUrl: {
			type: 'string',
		},
		muviFlexApiUrl: {
			type: 'string',
		},
		muviLoader: {
			type: 'integer',
		},
		selectedItemCounts:{
			type:'integer',
			default: 0,
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( { attributes, setAttributes } ) => {
		// setAttributes( { muviLoader: 0 } );
		setAttributes( { lengthOfMuvi: 0 } );
		setAttributes( { indexedValue: 0 } );
		setAttributes( { buttonEnable: 'disabled' } );
		setAttributes( { muviApiUrl: cgbGlobal.muvi_api_url } );
		setAttributes( { muviFlexApiUrl: cgbGlobal.muvi_flex_api_url } );
		setAttributes( { categoryList: cgbGlobal.categories } );
		setAttributes( { authToken: cgbGlobal.auth_token } );
		setAttributes( { appId: cgbGlobal.app_id } );
		setAttributes( { authPass: cgbGlobal.auth_secret } );
		setAttributes( { muviHeight: cgbGlobal.height ? cgbGlobal.height : "510px"  } );
		setAttributes( { muviWidth: cgbGlobal.width ? cgbGlobal.width : "900px" } );
		setAttributes( { muviAudioHeight: cgbGlobal.audio_height ? cgbGlobal.audio_height : "180px" } );
		setAttributes( { muviAudioWidth: cgbGlobal.audio_width ? cgbGlobal.audio_width : "900px" } );
		setAttributes( { muviProductSelected: cgbGlobal.muvi_products } );
		setAttributes( { muviBearerToken: cgbGlobal.muvibearer_token } );
		const [ isOpen, setOpen ] = useState( false );
		const openModal = () =>{
			setOpen( true );
			if ( attributes.muviProductSelected === 'muvi 6' ) {
				setAttributes( { muviCategoryUuid: attributes.categoryList[ 0 ].category_uuid } );
				onSelectMuviFlex( attributes.categoryList[ 0 ].category_name );
			} else {
				onSelect( attributes.categoryList[ 0 ].permalink );
			}
			setAttributes( { cssClassReplace: 'muvi-content wp-core-ui' } );
			setAttributes( { selectOrNot: '' } );
		};
		const onSelectMuviFlex = async (tabName) => {
			try {
			  setAttributes( { muviLoader: 0 } );
			  const { categoryList, muviBearerToken, muviFlexApiUrl, appId } = attributes;
			  const i = categoryList.findIndex((category) => category.category_name === tabName);

			//   console.log(i);
		  
			  if (i === -1) {
				console.log("No Tabs are there");
				// Handle the case where the tabName is not found in categoryList
				return;
			  }
		  
			  const categoryUuid = categoryList[i].category_uuid;
			  const token = muviBearerToken;
			  const contentQuery = {
				query: '{ contentList(is_encoded: 1,app_token:\":app_token\",product_key:\":product_key\",store_key:\":store_key\", page: 1,per_page: 500,multi_category_uuid: \"[' + attributes.categoryList[ i ].category_uuid + ']\",content_asset_type: \"\",sort_by: \"nto\",content_name: \"\"){page_info{total_count} content_list{level_one_count level_two_count is_encoded is_parent content_created_date app_token product_key store_key content_name content_uuid content_parent_uuid content_desc content_asset_type content_asset_uuid content_level categories{ category_name } video_details {reference_uuid expected_duration encoding_status encoding_end_time encoding_resolutions file_name third_party_url file_url is_feed encoding_profile_uuid } audio_details { file_name file_url } posters {website{file_uuid file_url file_name}   } banners {website{file_uuid file_url file_name} } path root_parent_uuid no_of_child_content}}}',
				token: token,
			  };
		  
			  const embdHeaders = {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			  };
		  
			  const response = await axios.post(`${muviFlexApiUrl}/content`, contentQuery);

			  const data = response.data.data;
			  
			  if(response.data.data === null || response.data.data === undefined){
				setAttributes( { muviLoader: 1 } );
				setAttributes( { selectedTab: tabName } );
				setAttributes( { movie: '' } );
				return;
			  }

			  const contentList = data.contentList;
		  
			  const embdRequests = await Promise.all(
				contentList.content_list.map(async (item) => {
				  const requestBody = {
					content_uuid: item.content_uuid,
					secret_key: cgbGlobal.auth_secret,
					app_id: appId,
					product_key: item.product_key,
					app_token: item.app_token,
					store_key: item.product_key,
				  };
		  
				  try {
					const embdResponse = await axios.post(`${muviFlexApiUrl}/content/embed/generate`, requestBody, { headers: embdHeaders });
					const iframeHTML = embdResponse.data.data;
					const parser = new DOMParser();
					const doc = parser.parseFromString(iframeHTML, "text/html");
					const iframeElement = doc.querySelector("iframe");
					const srcValue = iframeElement.getAttribute("src");
					item.embd = srcValue;
					// console.log(embdResponse.data);
				  } catch (error) {
					console.error(error);
					throw error;
				  }
				})
			  );
		  
			  const lengthOfMuvi = contentList.content_list.length;
		  
			  const newAttributes = {
				muviLoader: 1,
				muviCategoryUuid: categoryUuid,
				movie: contentList.content_list,
				lengthOfMuvi: lengthOfMuvi,
				selectedTab: tabName
			  };
		  
			  setAttributes(newAttributes);
			} catch (error) {
			  console.error(error);
			  // Handle any errors that occur during the process
			}
		};
		  
		const handleChange = async (e) => {
			setAttributes({ muviLoader: 0 });
			console.log(e.target.value);
		  
			if (attributes.muviProductSelected === 'muvi 6') {
			  const token = attributes.muviBearerToken;
		  
			  const content = {
				query: '{ contentList(is_encoded: 1,app_token:\":app_token\",product_key:\":product_key\",store_key:\":store_key\", page: 1,per_page: 500,content_name:\"'+ e.target.value +'\" ,content_asset_type: \"\",sort_by: \"nto\"){page_info{total_count} content_list{level_one_count level_two_count is_encoded is_parent content_created_date app_token product_key content_name content_uuid content_parent_uuid content_desc content_asset_type content_asset_uuid content_level categories{ category_name } video_details {reference_uuid expected_duration encoding_status encoding_end_time encoding_resolutions file_name third_party_url file_url is_feed encoding_profile_uuid } audio_details {reference_uuid expected_duration encoding_status encoding_end_time encoding_resolutions file_name third_party_url encoding_profile_uuid } posters {website{file_uuid file_url file_name}   } banners {website{file_uuid file_url file_name} } path root_parent_uuid no_of_child_content}}}',
				token: token,
			  };
		  
			  const embdHeaders = {
				'Authorization': 'Bearer '+token,
				'Content-Type': 'application/json', // Modify this based on the content type you're sending
			  };
		  
			  try {
				const { categoryList, muviBearerToken, muviFlexApiUrl, appId } = attributes;

				const response = await axios.post(`${muviFlexApiUrl}/content`, content);
				setAttributes({ muviLoader: 1 });
				const data = response.data;
				console.log(data);
		  
				if (data.code == 205) {
				  setAttributes({ muviLoader: 1 });
				  setAttributes({ movie: '' });
				  return;
				}
		  
				const contentList = data.data.contentList;
				const lengthoflist = contentList.content_list.length;
		  
				// Use Promise.all to await all embdList promises
				await Promise.all(
				  contentList.content_list.map(async (item) => {
					const requestBody = {
					  content_uuid: item.content_uuid,
					  secret_key: cgbGlobal.auth_secret,
					  app_id: attributes.appId,
					  product_key: item.product_key,
					  app_token: item.app_token,
					  store_key: item.product_key,
					};
		  
					try {
					  const embdResponse = await axios.post(`${muviFlexApiUrl}/content/embed/generate`, requestBody, { headers: embdHeaders });
					  const iframeHTML = embdResponse.data.data;
		  
					  const parser = new DOMParser();
					  const doc = parser.parseFromString(iframeHTML, "text/html");
					  const iframeElement = doc.querySelector("iframe");
					  const srcValue = iframeElement.getAttribute("src");
					  item.embd = srcValue;
					  console.log(embdResponse.data);
					} catch (error) {
					  console.error(error);
					  throw error;
					}
				  })
				);
		  
				setAttributes({ movie: contentList.content_list });
				setAttributes({ lengthOfMuvi: lengthoflist });
		  
				return response;
			  } catch (error) {
				console.error(error);
			  }
			} else {
			  // Handle other cases when a different product is selected
			  const mov = axios.post( attributes.muviApiUrl + '/rest/searchData/authToken/' + attributes.authToken + '/q/' + e.target.value )
			  .then( function( response ) {
				  setAttributes( { muviLoader: 1 } );
				  const searchData = response.data.search;
				  if ( response.data.code === 200 ) {
					  const lengthoflist = searchData.length;
					  setAttributes( { lengthOfMuvi: lengthoflist } );
					  setAttributes( { movie: searchData } );
				  } else {
					  const mov = axios.post( attributes.muviApiUrl + '/rest/getContentList?authToken=' + attributes.authToken + '&permalink=' + attributes.selectedTab + '&limit=500' )
						  .then( function( responseData ) {
							  setAttributes( { muviLoader: 1 } );
							  const data = responseData.data;
							  const lengthoflist = data.movieList.length;
							  setAttributes( { movie: data.movieList } );
							  setAttributes( { lengthOfMuvi: lengthoflist } );
							  return response;
						  } );
				  }
				  return response;
			  } );
			}
		};
		  
		const videoSelected = () => {
			if ( attributes.muviProductSelected === 'muvi 6' ) {
				// console.log(attributes.selectedProp);
				console.log(attributes.selectedTab);
				console.log(attributes);
				if(attributes.selectContentType == 1){
					setAttributes( { shortCode:  attributes.selectedProp } );
					setAttributes( { selectedProp: 0 } );
				}else{
					setAttributes( { shortCode: '[muvimediaflex permalink="' + attributes.selectedProp + '" height="'+ attributes.muviAudioHeight +'" width="'+ attributes.muviAudioWidth +'"]' } );
					setAttributes( { selectedProp: 0 } );
				}
			} else {
				setAttributes( { shortCode: '[muvimedia permalink="' + attributes.selectedProp + '" height="' + attributes.muviHeight + '" width="' + attributes.muviWidth + '"]' } );
				setAttributes( { selectedProp: 0 } );
			}
			closeModal();
		};
		const selectOnClick = ( props ) => {
			setAttributes( { selectStatus: 1 } );
			setAttributes( { selectOrNot: 'selected' } );
			setAttributes( { cssClassReplace: 'muvi-content wp-core-ui selected' } );
			setAttributes( { selectedProp: props.target.value } );
		};
		const selectOnFlexClick = ( props , arg2 , indexed ) => {
			
			if(indexed){
				attributes.selectedItemCounts = attributes.selectedItemCounts + 1;
			}

			console.log(attributes.selectedItemCounts);

			attributes.selectedProp[attributes.selectedItemCounts] = '[muvimediaflex permalink="' + props.target.value + '" height="' + attributes.muviHeight + '" width="' + attributes.muviWidth + '"]';

			console.log(attributes.selectedProp);

			setAttributes( { selectStatus: 1 } );
			setAttributes( { selectOrNot: 'selected' } );
			setAttributes( { cssClassReplace: 'muvi-content wp-core-ui selected' } );
			setAttributes( { selectContentType: arg2 } );
			setAttributes( { selectedProp: attributes.selectedProp } );



		};
		const closeModal = () => { setOpen( false ); attributes.selectedItemCounts = 0; attributes.selectedProp = []; };
		const onSelect = ( tabName ) => {
			setAttributes( { muviLoader: 0 } );
			setAttributes( { selectedTab: tabName } );
			const mov = axios.post( attributes.muviApiUrl + '/rest/getContentList?authToken=' + attributes.authToken + '&permalink=' + tabName + '&limit=500' )
				.then( function( response ) {
					setAttributes( { muviLoader: 1 } );
					const data = response.data;
					const lengthoflist = data.movieList.length;
					setAttributes( { movie: data.movieList } );
					setAttributes( { lengthOfMuvi: lengthoflist } );
					return response;
				} );
		};
		const obj = attributes.movie;
		const obje = attributes.categoryList;
		const ln = attributes.movie ? attributes.movie.length : '';
		const lnOfCategory = attributes.categoryList ? attributes.categoryList.length : 0;
		const myShortcode = attributes.shortCode;
		console.log(myShortcode);
		console.log(typeof(myShortcode));
		return (
			<div className="fullMediaConnect">
				{ attributes.shortCode !== undefined ? <div><div className="topTitle">
					<span className="me-3 col-gape">
						<svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M2.57901 0.0673955C4.06498 -0.341337 6.40245 1.21325 7.59123 1.92853C10.365 3.66564 12.8037 5.03108 15.4101 7.09902C16.613 8.13299 17.8496 9.75265 16.212 11.4418C15.5186 12.1571 15.6035 12.2641 15.0091 11.8554C13.0043 10.6145 8.83689 7.79222 6.75657 6.46391C5.96402 5.95297 4.98463 5.44463 4.18281 6.27177C3.58135 7.71936 4.69474 8.14032 5.58632 8.75342C7.36949 9.97963 9.01569 10.836 10.7989 12.0621C11.1998 12.3379 13.2047 13.4124 13.2047 13.9234C13.3038 14.23 12.1999 15.062 12.0018 15.1641C11.5065 15.4707 11.0448 15.9914 10.3979 15.7846C9.017 15.3431 7.5233 14.0182 6.4336 13.303C5.48041 12.6773 4.42872 13.0962 4.22823 13.303C3.42629 14.1302 4.11733 14.843 4.22823 14.9573C4.3709 15.1045 7.89062 17.0302 7.79154 17.439C7.79154 17.7455 6.78679 18.3707 6.58863 18.4729C5.79618 18.9838 5.27486 19.0958 4.3833 19.3001C2.20388 19.8111 0.871235 18.76 0.574049 16.8185C-0.0203405 13.14 -0.177943 7.99662 0.218314 4.31804C0.515499 2.68312 0.59773 0.476128 2.57901 0.0673955Z" fill="#0CB9F3"></path>
						</svg>
					</span>
					Muvi Media Shortcode
				</div><textarea className="block-editor-plain-text blocks-shortcode__textarea updateCls" rows={ 1 } value={ myShortcode }>{ myShortcode }</textarea></div> : '' }
				{ isOpen && (
					<div>
						<Modal title="Muvi Media Library" isFullScreen="true" onRequestClose={ closeModal } className="fancybox-content" style={ { width: '100%', height: '100%' } }>
							<div className="clearbth"></div>
							<div>
								<div className="row">
									<div className="col-12">
										<div className="search"><input type="text" name="search" className="search-input inputSearchCls" id="search" placeholder="Search your content"
											onChange={ handleChange } /></div>
									</div>
								</div>
								<div className="row">
									<div className="col-12">
										<TabPanel
											className="my-tab-panel"
											onSelect={ attributes.muviProductSelected === 'muvi 6' ? onSelectMuviFlex : onSelect }
											tabs={ lnOfCategory > 0 ? obje.map( ( categoryList, index ) => {
												return (
													{
														name: attributes.muviProductSelected === 'muvi 6' ? attributes.categoryList[ index ].category_name : attributes.categoryList[ index ].permalink,
														title: attributes.categoryList[ index ].category_name,
														className: attributes.categoryList[ index ].category_name === attributes.selectedTab || attributes.categoryList[ index ].permalink === attributes.selectedTab ? ' active-tab ' + attributes.selectedTab + ' ' + attributes.categoryList[ index ].category_name : '' + attributes.selectedTab + ' ' + attributes.categoryList[ index ].category_name,
														data: <div className="muvi-media-content tab-one">
															<div className="muvi-inner-content">
																<div>
																	{ attributes.muviLoader === 0 ? <div className="spinner-border" role="status">
																		<span className="visually-hidden"><img className="loader-inst" src={ cgbGlobal.pluginDirUrl + '/src/block/loader.gif' } alt="" /></span>
																	</div> : <div className="muvi_content_list_wrapper">
																		{ attributes.muviProductSelected === 'muvi 5' ?
																			<ul className="muvi_content_list" >
																				{ ln > 0 ? obj.map( ( muvilist, indexed ) => {
																					return (
																						<li key={ indexed } data-permalink={ attributes.movie[ indexed ].permalink } className={ attributes.movie[ indexed ].permalink === attributes.selectedProp ? attributes.cssClassReplace : null } data-hasepisodes="0">
																							<div className="planSingleBox">
																								<div className="select-package-checkbox">
																									<input type="radio" name="selectpackage" value={ attributes.movie[ indexed ].permalink } onClick={ selectOnClick } id={ indexed } />
																									<label htmlFor={ indexed }>
																										<div className="item">
																											<div className="inner-item">
																												<img src={ attributes.movie[ indexed ].poster_url } alt={ attributes.movie[ indexed ].name } />
																											</div>
																											<figure>{ attributes.movie[ indexed ].name }</figure>
																										</div>
																									</label>
																								</div>
																							</div>
																						</li>
																					);
																				} ) : 'No content avilable!!!' }
																			</ul> : <ul className="muvi_content_list">
																				{ ln > 0 ? obj.map( ( muvilist, indexed ) => {
																					return (
																						<li key={ indexed } data-permalink={ attributes.movie[ indexed ].permalink } className={ attributes.movie[ indexed ].permalink === attributes.selectedProp ? attributes.cssClassReplace : null } data-hasepisodes="0">
																							<div className="planSingleBox">
																								<div className="select-package-checkbox">
																									<input type="radio" name={"selectpackage_"+indexed} value={ attributes.movie[ indexed ].embd } onClick={(e) => selectOnFlexClick(e, attributes.movie[indexed].content_asset_type, indexed)} id={ indexed } />
																									<label htmlFor={ indexed }>
																										<div className="item">
																											<div className="inner-item">
																												<img src={ attributes.movie[ indexed ].posters.website != null ? attributes.movie[ indexed ].posters.website[ 0 ].file_url : '' } alt={ attributes.movie[ indexed ].content_name } />
																											</div>
																											<figure>{ attributes.movie[ indexed ].content_name }</figure>
																										</div>
																									</label>
																								</div>
																							</div>
																						</li>
																					);
																				} ) : 'No content avilable!!!' }
																			</ul> }
																	</div> }
																	<div className="clearbth"></div>
																</div>
															</div>
														</div>,
													}
												);
											} ) : 'Please wait for loading the content' }
										>
											{ ( tab ) =>
												<p>{ tab.data }</p>
											}
										</TabPanel>
									</div>
								</div>
							</div>
							<div className="tab-button modal-footer mt30">
								{ attributes.selectStatus === 1 ? <Button variant="secondary" className="insertBtn" onClick={ videoSelected }> Insert </Button> : <Button variant="secondary" className="insertBtn" disabled onClick={ videoSelected }> Insert </Button> }
							</div>
						</Modal>
					</div>
				) }
				{ attributes.shortCode === undefined ? <div>
					<div className="topTitle">
						<span className="me-3 col-gape">
							<svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M2.57901 0.0673955C4.06498 -0.341337 6.40245 1.21325 7.59123 1.92853C10.365 3.66564 12.8037 5.03108 15.4101 7.09902C16.613 8.13299 17.8496 9.75265 16.212 11.4418C15.5186 12.1571 15.6035 12.2641 15.0091 11.8554C13.0043 10.6145 8.83689 7.79222 6.75657 6.46391C5.96402 5.95297 4.98463 5.44463 4.18281 6.27177C3.58135 7.71936 4.69474 8.14032 5.58632 8.75342C7.36949 9.97963 9.01569 10.836 10.7989 12.0621C11.1998 12.3379 13.2047 13.4124 13.2047 13.9234C13.3038 14.23 12.1999 15.062 12.0018 15.1641C11.5065 15.4707 11.0448 15.9914 10.3979 15.7846C9.017 15.3431 7.5233 14.0182 6.4336 13.303C5.48041 12.6773 4.42872 13.0962 4.22823 13.303C3.42629 14.1302 4.11733 14.843 4.22823 14.9573C4.3709 15.1045 7.89062 17.0302 7.79154 17.439C7.79154 17.7455 6.78679 18.3707 6.58863 18.4729C5.79618 18.9838 5.27486 19.0958 4.3833 19.3001C2.20388 19.8111 0.871235 18.76 0.574049 16.8185C-0.0203405 13.14 -0.177943 7.99662 0.218314 4.31804C0.515499 2.68312 0.59773 0.476128 2.57901 0.0673955Z" fill="#0CB9F3" />
							</svg>
						</span>
						Muvi Media Connect By Anil
					</div>
					<div className="uploadText">Upload a video file, pick one from your media library, or add one with a url</div>
					<div className="middleOne">
						<button className="uploadBtn" data-bs-toggle="modal" data-bs-target="#uploadMax" onClick={ openModal }>Upload Muvi Media</button>
					</div>
					<div className="learnText">Learn more about Muvi Media
						<a href="muvi.com">
							<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.75 5.25L10.5 1.5M8 1.5H10.5V4M10.5 7V9.5C10.5 9.76522 10.3946 10.0196 10.2071 10.2071C10.0196 10.3946 9.76522 10.5 9.5 10.5H2.5C2.23478 10.5 1.98043 10.3946 1.79289 10.2071C1.60536 10.0196 1.5 9.76522 1.5 9.5V2.5C1.5 2.23478 1.60536 1.98043 1.79289 1.79289C1.98043 1.60536 2.23478 1.5 2.5 1.5H5" stroke="#353535" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</a>
					</div></div> : '' }
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} attributes Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( { attributes } ) => {
		const myShortcode = attributes.shortCode;
		return <RawHTML>{ myShortcode }</RawHTML>;
	},
} );
