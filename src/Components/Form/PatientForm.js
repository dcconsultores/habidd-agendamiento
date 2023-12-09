import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { propTypes } from 'react-bootstrap/esm/Image';

function PatientForm({
	selectedPatient,
	setSelectedPatient,
	patients,
	status,
}) {
	const [t, i18n] = useTranslation('global');

	return (
		<Form.Group controlId='formGroupPatient'>
			<Form.Label className='form-modal__label'>
				{t('Codes.Patient')}
			</Form.Label>
			{status === 'exist' ? (
				<Form.Control
					type='text'
					value={selectedPatient}
					readOnly
					className='form-modal__input form-modal__input--read-only'
				/>
			) : (
				<Form.Select
					value={selectedPatient}
					className='form-modal__select'
					onChange={event => {
						setSelectedPatient(event.target.value); // Actualizar el estado cuando cambia la selección
						event.preventDefault();
					}}
				>
					<option value='blanco'> </option>
					{patients.map(opcion => (
						<option key={opcion.id} value={opcion.id}>
							{opcion.nameFirst} {opcion.nameSecond} {opcion.surnameFirst}{' '}
							{opcion.surnameSecond}
						</option>
					))}
					<option value='nuevoPaciente'>{t('Codes.NewPatient')}</option>
				</Form.Select>
			)}
		</Form.Group>
	);
}

PatientForm.propTypes = {
	selectedPatient: PropTypes.any,
	setSelectedPatient: propTypes.any,
	patients: PropTypes.any,
	setName: PropTypes.any,
	setLastName: PropTypes.any,
	setDocumentType: PropTypes.any,
	setDocument: PropTypes.any,
	status: PropTypes.any,
};

export default PatientForm;
