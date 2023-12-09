import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import '../../Stylesheets/Calendar/Calendar.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import InputGroup from 'react-bootstrap/InputGroup';
import { UsePatients } from '../../Hooks/Patients/UsePatients.js';
import { useTranslation } from 'react-i18next';
import {
	handleCancelAppointment,
	handleConfirmAppointment,
	handleEditAppointment,
	handleCreateAppointment,
} from '../../Data/Appointment.js';
import { calculateAge } from '../../Helpers/DateHelper.js';
import PatientForm from './PatientForm';
import PersonalDataForm from './PersonalDataForm';
import ContactForm from './ContactForm';
import ReasonForm from './ReasonForm';
import DateTimePicker from './DateTimePicker';

function ModalForm({
	serviceData,
	modalShow,
	setModalShow,
	dueDate,
	setDueDate,
	selectedTime,
	setSelectedTime,
	selectedPatient,
	setSelectedPatient,
	setName,
	status,
	lastName,
	setLastName,
	documentType,
	setDocumentType,
	setDocument,
	document,
	dateOfBirth,
	setDateOfBirth,
	name,
	phoneNumber,
	setPhoneNumber,
	email,
	setEmail,
	reason,
	setReason,
	setStatus,
	idAppointment,
}) {
	const { patients } = UsePatients();
	const age = calculateAge(dateOfBirth, Date.now());
	const [isWhatsappChecked, setIsWhatsappChecked] = useState(true);
	const [isEmailChecked, setIsEmailChecked] = useState(true);
	const [isSmsChecked, setIsSmsChecked] = useState(true);
	const [t, i18n] = useTranslation('global');
	const documentTypeOptions = [
		'cc',
		'ce',
		'cd',
		'p',
		'sc',
		'pep',
		'rc',
		'ti',
		'cnv',
		'asi',
		'msi',
	];
	const handleSubmit = e => {
		e.preventDefault();
		handleCreateAppointment(setModalShow, selectedPatient);
	};
	return (
		<div>
			<Modal
				show={modalShow}
				onHide={() => setModalShow(false)}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
				className='modal'
			>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>
						{t('Codes.Request')}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Row className='form-modal'>
							<Form.Group
								className='form-modal__group'
								controlId='formGrouService'
								change
							>
								<Form.Label className='form-modal__label'>
									{t('Codes.Service')}
								</Form.Label>
								<p className='form-modal__text'>
									{serviceData.service.code} - {serviceData.service.name} -{' '}
									{serviceData.selectedProfessional}
								</p>
							</Form.Group>
							<DateTimePicker
								dueDate={dueDate}
								setDueDate={setDueDate}
								selectedTime={selectedTime}
								setSelectedTime={setSelectedTime}
							/>
							<PatientForm
								selectedPatient={selectedPatient}
								setSelectedPatient={setSelectedPatient}
								patients={patients}
								setName={setName}
								setLastName={setLastName}
								setDocumentType={setDocumentType}
								setDocument={setDocument}
								status={status}
							/>
							{/* Nombre del paciente: se muestra solo si se selecciona 'Nuevo paciente' */}
							{selectedPatient === 'nuevoPaciente' && (
								<>
									<PersonalDataForm
										documentTypeOptions={documentTypeOptions}
										documentType={documentType}
										setDocumentType={setDocumentType}
										document={document}
										setDocument={setDocument}
										dateOfBirth={dateOfBirth}
										setDateOfBirth={setDateOfBirth}
										age={age}
										phoneNumber={phoneNumber}
										setPhoneNumber={setPhoneNumber}
										email={email}
										setEmail={setEmail}
										setName={setName}
										lastName={lastName}
										setLastName={setLastName}
										name={name}
									/>
									<ContactForm
										isWhatsappChecked={isWhatsappChecked}
										setIsWhatsappChecked={setIsWhatsappChecked}
										isEmailChecked={isEmailChecked}
										setIsEmailChecked={setIsEmailChecked}
										isSmsChecked={isSmsChecked}
										setIsSmsChecked={setIsSmsChecked}
									/>
								</>
							)}
							<ReasonForm
								status={status}
								reason={reason}
								setReason={setReason}
							/>{' '}
						</Row>
						<Row className='modal-footer'>
							<Button
								className='modal-footer__button modal-footer__button--close'
								onClick={() => {
									setModalShow(false);
									setStatus('new');
								}}
							>
								{t('Codes.buttons.Close')}
							</Button>
							{status === 'new' ? (
								<Button
									type='submit'
									className='modal-footer__button modal-footer__button--register'
								>
									{t('Codes.buttons.Register')}
								</Button>
							) : (
								<>
									<Button
										type='button'
										className='modal-footer__button modal-footer__button--cancel'
										onClick={() => {
											handleCancelAppointment(idAppointment, setModalShow);
										}}
									>
										{t('Codes.buttons.Cancel')}
									</Button>
									<Button
										type='button'
										className='modal-footer__button modal-footer__button--close'
										onClick={() => {
											handleConfirmAppointment(idAppointment, setModalShow);
										}}
									>
										{t('Codes.buttons.Confirm')}
									</Button>
									<Button
										type='button'
										className='modal-footer__button modal-footer__button--update'
										onClick={() => {
											handleEditAppointment(idAppointment, setModalShow);
										}}
									>
										{t('Codes.buttons.Update')}
									</Button>
								</>
							)}
						</Row>
					</Form>
				</Modal.Body>
			</Modal>
		</div>
	);
}
ModalForm.propTypes = {
	serviceData: PropTypes.any,
	modalShow: PropTypes.any,
	setModalShow: PropTypes.any,
	handleSubmit: PropTypes.any,
	dueDate: PropTypes.any,
	handleDateChangee: PropTypes.any,
	selectedTime: PropTypes.any,
	handleTimeChange: PropTypes.any,
	selectedPatient: PropTypes.any,
	handlePatientChange: PropTypes.any,
	patients: PropTypes.any,
	setName: PropTypes.any,
	status: PropTypes.any,
	lastName: PropTypes.any,
	setLastName: PropTypes.any,
	documentType: PropTypes.any,
	setDocumentType: PropTypes.any,
	setDocument: PropTypes.any,
	document: PropTypes.any,
	dateOfBirth: PropTypes.any,
	handleDateOfBirthChange: PropTypes.any,
	age: PropTypes.any,
	phoneNumber: PropTypes.any,
	setPhoneNumber: PropTypes.any,
	email: PropTypes.any,
	setEmail: PropTypes.any,
	reason: PropTypes.any,
	setReason: PropTypes.any,
	setStatus: PropTypes.any,
	handleCancelAppointment: PropTypes.any,
	handleConfirmAppointment: PropTypes.any,
	handleEditAppointment: PropTypes.any,
	name: PropTypes.any,
	setSelectedTime: PropTypes.any,
	setSelectedPatient: PropTypes.any,
	setDateOfBirth: PropTypes.any,
	setDueDate: PropTypes.any,
	idAppointment: PropTypes.any,
};

export default ModalForm;
