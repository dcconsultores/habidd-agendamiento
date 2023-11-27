import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import '../../Stylesheets/Calendar/Calendar.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import InputGroup from 'react-bootstrap/InputGroup';
import { useTranslation } from 'react-i18next';
import {
	handleCancelAppointment,
	handleConfirmAppointment,
	handleEditAppointment,
	handleCreateAppointment,
} from '../../Data/Appointment.js';

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
	patients,
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
	age,
	phoneNumber,
	setPhoneNumber,
	email,
	setEmail,
	reason,
	setReason,
	setStatus,
	idAppointment,
	isWhatsappChecked,
	setIsWhatsappChecked,
	isEmailChecked,
	setIsEmailChecked,
	isSmsChecked,
	setIsSmsChecked,
}) {
	const [t, i18n] = useTranslation('global');
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
							<Form.Group
								className='form-modal__group'
								controlId='formGroupDate'
							>
								<Form.Label className='form-modal__label'>
									{t('Codes.Date')}
								</Form.Label>
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
							<Form.Group
								className='form-modal__group'
								controlId='formGroupTime'
							>
								<Form.Label className='form-modal__label'>
									{t('Codes.Hour')}
								</Form.Label>
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
							<Form.Group
								className='form-modal__group'
								controlId='formGroupPatient'
							>
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
										{patients.map((opcion, index) => (
											<option key={opcion.id} value={opcion.id}>
												{opcion.nameFirst} {opcion.nameSecond}{' '}
												{opcion.surnameFirst} {opcion.surnameSecond}
											</option>
										))}
										<option value='nuevoPaciente'>
											{t('Codes.NewPatient')}
										</option>
									</Form.Select>
								)}
							</Form.Group>
							{/* Nombre del paciente: se muestra solo si se selecciona 'Nuevo paciente' */}
							{selectedPatient === 'nuevoPaciente' && (
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
												<option value='blanco'> </option>
												<option value='cc'>{t('Codes.cc')}</option>
												<option value='ce'>{t('Codes.ce')}</option>
												<option value='cd'>{t('Codes.cd')}</option>
												<option value='p'>{t('Codes.p')}</option>
												<option value='sc'>{t('Codes.sc')}</option>
												<option value='pep'>{t('Codes.pep')}</option>
												<option value='rc'>{t('Codes.rc')}</option>
												<option value='ti'>{t('Codes.ti')}</option>
												<option value='cnv'>{t('Codes.cnv')}</option>
												<option value='asi'>{t('Codes.asi')}</option>
												<option value='msi'>{t('Codes.msi')}</option>
											</Form.Select>
										</Form.Group>

										<Form.Group as={Col} controlId='formGroupDocument'>
											<Form.Label className='form-modal__label'>
												{t('Codes.ID')}
											</Form.Label>
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
								</>
							)}
							<Form.Group
								className='form-modal__group'
								controlId='formGroupReason'
							>
								<Form.Label className='form-modal__label'>
									{t('Codes.Reason')}
								</Form.Label>
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
						</Row>
						<Row className='modal-footer'>
							<Button
								className='modal-footer__button modal-footer__button--close'
								onClick={() => {
									setModalShow(false);
									setStatus('new');
								}}
							>
								{t('Codes.Close')}
							</Button>
							{status === 'new' ? (
								<Button
									type='submit'
									className='modal-footer__button modal-footer__button--register'
								>
									{t('Codes.Register')}
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
										{t('Codes.Cancel')}
									</Button>
									<Button
										type='button'
										className='modal-footer__button modal-footer__button--close'
										onClick={() => {
											handleConfirmAppointment(idAppointment, setModalShow);
										}}
									>
										{t('Codes.Confirm')}
									</Button>
									<Button
										type='button'
										className='modal-footer__button modal-footer__button--update'
										onClick={() => {
											handleEditAppointment(idAppointment, setModalShow);
										}}
									>
										{t('Codes.Update')}
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
	isWhatsappChecked: PropTypes.any,
	setIsWhatsappChecked: PropTypes.any,
	isEmailChecked: PropTypes.any,
	setIsEmailChecked: PropTypes.any,
	isSmsChecked: PropTypes.any,
	setIsSmsChecked: PropTypes.any,
};

export default ModalForm;
