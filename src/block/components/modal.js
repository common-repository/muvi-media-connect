import { __ } from '@wordpress/i18n';
// import { useSelect } from '@wordpress/data';
import { Modal, Button } from '@wordpress/components';

export const StreamingModal = ( props ) => {
	const {
		wasDisplayed,
		isOpen,
		closeModal,
	} = props;

	// if the Modal was already displayed this session, don't display it again
	if ( wasDisplayed ) {
		return null;
	}
	// The Modal itself
	return (
		<div>{ isOpen && (
			<Modal
				title="Streaming Royalties"
				isDismissible={ false }
				shouldCloseOnClickOutside={ false }
				shouldCloseOnEsc={ false } >
				<Button isPrimary onClick={ closeModal }>
					{ __( 'Start Creating' ) }
				</Button>
			</Modal>
		) }</div>
	);
};
