import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { propTypes } from 'react-bootstrap/esm/Image';

function DateTimePicker({
	dueDate,
	setDueDate,
	selectedTime,
	setSelectedTime,
}) {
	const [t, i18n] = useTranslation('global');
	return (
		<>
			{' '}
			<Form.Group className='form-modal__group' controlId='formGroupDate'>
				<Form.Label className='form-modal__label'>{t('Codes.Date')}</Form.Label>
				<Form.Control
					type='date'
					className='form-modal__input'
					placeholder='Due date'
					defaultValue={dueDate}
					onChange={event => {
						setDueDate(event.target.value);
						event.preventDefault();
					}}
				/>
			</Form.Group>
			<Form.Group className='form-modal__group' controlId='formGroupTime'>
				<Form.Label className='form-modal__label'>{t('Codes.Hour')}</Form.Label>
				<Form.Control
					type='time'
					className='form-modal__input'
					placeholder={t('Codes.Hour')}
					value={selectedTime}
					onChange={e => {
						setSelectedTime(e.target.value);
					}}
				/>
			</Form.Group>
		</>
	);
}

DateTimePicker.propTypes = {
	dueDate: propTypes.any,
	setDueDate: propTypes.any,
	selectedTime: propTypes.any,
	setSelectedTime: propTypes.any,
};

export default DateTimePicker;
