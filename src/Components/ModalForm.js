import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import '../Stylesheets/Calendar.css';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

import {
	handleCancelAppointment,
	handleConfirmAppointment,
	handleEditAppointment,
	handleCreateAppointment,
} from '../Data/Appointment';

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
}) {
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
						Solicitud de cita
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
								<Form.Label className='form-modal__label'>Servicio</Form.Label>
								<p className='form-modal__text'>
									{serviceData.service.code} - {serviceData.service.name} -{' '}
									{serviceData.selectedProfessional}
								</p>
							</Form.Group>
							<Form.Group
								className='form-modal__group'
								controlId='formGroupDate'
							>
								<Form.Label className='form-modal__label'>Fecha</Form.Label>
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
								<Form.Label className='form-modal__label'>Hora</Form.Label>
								<Form.Control
									type='time'
									className='form-modal__input'
									placeholder='Hora'
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
								<Form.Label className='form-modal__label'>Paciente</Form.Label>
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
											<option key={opcion.id} value={opcion}>
												{opcion.nameFirst} {opcion.nameSecond}{' '}
												{opcion.surnameFirst} {opcion.surnameSecond}
											</option>
										))}
										<option value='nuevoPaciente'>Nuevo paciente</option>
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
											Nombre del paciente
										</Form.Label>
										<Form.Control
											className='form-modal__input'
											placeholder='Nombre(s)'
											value={name}
											onChange={e => setName(e.target.value)}
										/>
									</Form.Group>
									<Form.Group
										className='form-modal__group'
										controlId='formGroupPatientLastName'
									>
										<Form.Label className='form-modal__label'>
											Apellido del paciente
										</Form.Label>
										<Form.Control
											className='form-modal__input'
											placeholder='Apellido(s)'
											value={lastName}
											onChange={e => setLastName(e.target.value)}
										/>
									</Form.Group>
									<Row className='form-modal__row'>
										<Form.Group as={Col} controlId='formGroupTypeDocument'>
											<Form.Label className='form-modal__label'>
												Tipo de Documento
											</Form.Label>
											<Form.Select
												value={documentType}
												className='form-modal__select'
												onChange={e => setDocumentType(e.target.value)}
											>
												<option value='blanco'> </option>
												<option value='blanco'> </option>
												<option value='cc'>Cédula de ciudadanía</option>
												<option value='ce'>Cédula de extranjería</option>
												<option value='cd'>Carnet diplomático</option>
												<option value='p'>Pasaporte</option>
												<option value='s'>Salvoconucto</option>
												<option value='pep'>
													Permiso Especial de Permanencia
												</option>
												<option value='rc'>Registro civil</option>
												<option value='ti'>Tarjeta de identidad</option>
												<option value='cnv'>Certificiado de nacido vivo</option>
												<option value='ai'>Adulto sin identificar</option>
												<option value='mi'>Menor sin identificar</option>
											</Form.Select>
										</Form.Group>

										<Form.Group as={Col} controlId='formGroupDocument'>
											<Form.Label className='form-modal__label'>
												Documento de Identificación
											</Form.Label>
											<Form.Control
												className='form-modal__input'
												placeholder='Documento'
												value={document}
												onChange={e => setDocument(e.target.value)}
											/>
										</Form.Group>
									</Row>
									<Row className='form-modal__row'>
										<Form.Group as={Col} controlId='formGroupDateOfBirth'>
											<Form.Label className='form-modal__label'>
												Fecha de nacimiento
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
												Edad
											</Form.Label>
											<Form.Control
												type='text'
												value={age + ' años'}
												readOnly
												className='form-modal__input form-modal__input--read-only'
											/>
										</Form.Group>
									</Row>
									<Row className='form-modal__row'>
										<Form.Group as={Col} controlId='formGroupPhoneNumber'>
											<Form.Label className='form-modal__label'>
												Teléfono Celular
											</Form.Label>
											<Form.Control
												className='form-modal__input'
												placeholder='Teléfono celular'
												value={phoneNumber}
												onChange={e => setPhoneNumber(e.target.value)}
											/>
										</Form.Group>
										<Form.Group as={Col} controlId='formGroupEmail'>
											<Form.Label className='form-modal__label'>
												Email
											</Form.Label>
											<Form.Control
												type='email'
												className='form-modal__input'
												placeholder='Email'
												value={email}
												onChange={e => setEmail(e.target.value)}
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
									Motivo de consulta
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
										placeholder='Motivo'
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
								Cerrar
							</Button>
							{status === 'new' ? (
								<Button
									type='submit'
									className='modal-footer__button modal-footer__button--register'
								>
									Registrar
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
										Cancelar
									</Button>
									<Button
										type='button'
										className='modal-footer__button modal-footer__button--close'
										onClick={() => {
											handleConfirmAppointment(idAppointment, setModalShow);
										}}
									>
										Confirmar
									</Button>
									<Button
										type='button'
										className='modal-footer__button modal-footer__button--update'
										onClick={() => {
											handleEditAppointment(idAppointment, setModalShow);
										}}
									>
										Actualizar
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
