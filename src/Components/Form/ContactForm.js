import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function ContactForm({
	isWhatsappChecked,
	setIsWhatsappChecked,
	isEmailChecked,
	setIsEmailChecked,
	isSmsChecked,
	setIsSmsChecked,
}) {
	const [t, i18n] = useTranslation('global');

	return (
		<Row className='form-modal__row'>
			<p>{t('Codes.SelectContactMethod')}</p>
			<Form.Group as={Col} controlId='formGroupContactedWhatsapp'>
				<Form.Check
					type='checkbox'
					label={t('Codes.Wpp')}
					checked={!isWhatsappChecked}
					onChange={e => {
						setIsWhatsappChecked(!isWhatsappChecked);
						console.log(isWhatsappChecked);
					}}
				/>
			</Form.Group>
			<Form.Group as={Col} controlId='formGroupEmail'>
				<Form.Check
					type='checkbox'
					label={t('Codes.Email')}
					checked={!isEmailChecked}
					onChange={e => {
						setIsEmailChecked(!isEmailChecked);
						console.log(isEmailChecked);
					}}
				/>
			</Form.Group>
			<Form.Group as={Col} controlId='formGroupEmail'>
				<Form.Check
					type='checkbox'
					label={t('Codes.sms')}
					checked={!isSmsChecked}
					onChange={e => {
						setIsSmsChecked(!isSmsChecked);
						console.log(isSmsChecked);
					}}
				/>
			</Form.Group>
		</Row>
	);
}

ContactForm.propTypes = {
	isWhatsappChecked: PropTypes.any,
	setIsWhatsappChecked: PropTypes.func,
	isEmailChecked: PropTypes.any,
	setIsEmailChecked: PropTypes.func,
	isSmsChecked: PropTypes.any,
	setIsSmsChecked: PropTypes.func,
};

export default ContactForm;
