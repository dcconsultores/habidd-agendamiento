import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function ReasonForm({ status, reason, setReason }) {
	const [t, i18n] = useTranslation('global');

	return (
		<Form.Group className='form-modal__group' controlId='formGroupReason'>
			<Form.Label className='form-modal__label'>{t('Codes.Reason')}</Form.Label>
			{status === 'exist' ? (
				<Form.Control
					as='textarea'
					value={reason}
					readOnly
					className='form-modal__input form-modal__input--read-only'
				/>
			) : (
				<Form.Control
					as='textarea'
					className='form-modal__textarea'
					placeholder={t('Codes.Reason')}
					value={reason}
					onChange={e => setReason(e.target.value)}
				/>
			)}
		</Form.Group>
	);
}

ReasonForm.propTypes = {
	status: PropTypes.any,
	reason: PropTypes.any,
	setReason: PropTypes.func,
};

export default ReasonForm;
