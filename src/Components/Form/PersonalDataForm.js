import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function PersonalDataForm({
	documentTypeOptions,
	setDocumentType,
	document,
	setDocument,
	dateOfBirth,
	setDateOfBirth,
	age,
	phoneNumber,
	setPhoneNumber,
	email,
	setEmail,
	setName,
	lastName,
	setLastName,
	name,
	documentType,
}) {
	const [t, i18n] = useTranslation('global');

	return (
		<>
			<Form.Group
				className='form-modal__group'
				controlId='formGroupPatientName'
			>
				<Form.Label className='form-modal__label'>
					{t('Codes.PatientName')}
				</Form.Label>
				<Form.Control
					className='form-modal__input'
					placeholder={t('Codes.Name')}
					value={name}
					onChange={e => setName(e.target.value)}
				/>
			</Form.Group>
			<Form.Group
				className='form-modal__group'
				controlId='formGroupPatientLastName'
			>
				<Form.Label className='form-modal__label'>
					{t('Codes.PatientLastName')}
				</Form.Label>
				<Form.Control
					className='form-modal__input'
					placeholder={t('Codes.LastName')}
					value={lastName}
					onChange={e => setLastName(e.target.value)}
				/>
			</Form.Group>
			<Row className='form-modal__row'>
				<Form.Group as={Col} controlId='formGroupTypeDocument'>
					<Form.Label className='form-modal__label'>
						{t('Codes.DocumentType')}
					</Form.Label>
					<Form.Select
						value={documentType}
						className='form-modal__select'
						onChange={e => setDocumentType(e.target.value)}
					>
						<option value='blanco'> </option>
						{documentTypeOptions.map((opcion, index) => (
							<option key={opcion} value={opcion}>
								{t(`Codes.document.${opcion}`)}
							</option>
						))}
					</Form.Select>
				</Form.Group>

				<Form.Group as={Col} controlId='formGroupDocument'>
					<Form.Label className='form-modal__label'>{t('Codes.ID')}</Form.Label>
					<Form.Control
						className='form-modal__input'
						placeholder={t('Codes.Number')}
						value={document}
						onChange={e => setDocument(e.target.value)}
					/>
				</Form.Group>
			</Row>
			<Row className='form-modal__row'>
				<Form.Group as={Col} controlId='formGroupDateOfBirth'>
					<Form.Label className='form-modal__label'>
						{t('Codes.BirthDate')}
					</Form.Label>
					<Form.Control
						type='date'
						className='form-modal__input'
						value={dateOfBirth}
						onChange={event => {
							setDateOfBirth(event.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group as={Col} controlId='formGroupAge'>
					<Form.Label className='form-modal__label'>
						{t('Codes.Age')}
					</Form.Label>
					<Form.Control
						type='text'
						value={age + t('Codes.Year')}
						readOnly
						className='form-modal__input form-modal__input--read-only'
					/>
				</Form.Group>
			</Row>
			<Row className='form-modal__row'>
				<Form.Group as={Col} controlId='formGroupPhoneNumber'>
					<Form.Label className='form-modal__label'>
						{t('Codes.PhoneNumber')}
					</Form.Label>
					<Form.Control
						className='form-modal__input'
						placeholder={t('Codes.Number')}
						value={phoneNumber}
						onChange={e => setPhoneNumber(e.target.value)}
					/>
				</Form.Group>
				<Form.Group as={Col} controlId='formGroupEmail'>
					<Form.Label className='form-modal__label'>
						{t('Codes.Email')}
					</Form.Label>
					<Form.Control
						type='email'
						className='form-modal__input'
						placeholder={t('Codes.ExampleEmail')}
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</Form.Group>
			</Row>
		</>
	);
}

PersonalDataForm.propTypes = {
	documentTypeOptions: PropTypes.array,
	setDocumentType: PropTypes.func,
	setDocument: PropTypes.func,
	document: PropTypes.any,
	dateOfBirth: PropTypes.any,
	setDateOfBirth: PropTypes.func,
	age: PropTypes.any,
	phoneNumber: PropTypes.any,
	setPhoneNumber: PropTypes.func,
	email: PropTypes.any,
	setEmail: PropTypes.func,
	setName: PropTypes.func,
	lastName: PropTypes.any,
	setLastName: PropTypes.func,
	name: PropTypes.any,
	documentType: PropTypes.any,
};

export default PersonalDataForm;
