import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../Stylesheets/Calendar.css';
import axios from 'axios';
import esLocale from '@fullcalendar/core/locales/es';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
function Calendar({ serviceData }) {
	const [hollidays, setHollidays] = useState([]);
	const [appointments, setAppointments] = useState([]);
	const [modalShow, setModalShow] = useState(false);
	const [dueDate, setDueDate] = useState(null);
	const [patients, setPatients] = useState([]);
	const [selectedPatient, setSelectedPatient] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [reason, setReason] = useState('');
	const [selectedTime, setSelectedTime] = useState('');
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [documentType, setDocumentType] = useState('');
	const [document, setDocument] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState('new');
	const [idAppointment, setIdAppointment] = useState('');
	const defaultValues = event => {
		setDueDate(null);
		setSelectedPatient('');
		setDateOfBirth('');
		setReason('');
		setSelectedTime('');
		setName('');
		setLastName('');
		setDocumentType('');
		setDocument('');
		setPhoneNumber('');
		setEmail('');
		setStatus('new');
	};
	const handleDateOfBirthChange = event => {
		setDateOfBirth(event.target.value);
	};
	const handleTimeChange = e => {
		setSelectedTime(e.target.value);
	};

	const handleReason = e => {
		console.log(reason);
		setReason(e.target.value);
	};
	const calculateAge = dateOfBirth => {
		// Calcular la edad a partir de la fecha de nacimiento
		const today = new Date();
		const birthDate = new Date(dateOfBirth);
		let age = today.getFullYear() - birthDate.getFullYear();

		// Ajustar la edad si el cumpleaños aún no ha ocurrido este año
		const monthDiff = today.getMonth() - birthDate.getMonth();
		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birthDate.getDate())
		) {
			age--;
		}

		return age;
	};
	const age = calculateAge(dateOfBirth);
	const handleDateChangee = event => {
		setDueDate(event.target.value);
		event.preventDefault();
	};

	const handlePatientChange = event => {
		setSelectedPatient(event.target.value); // Actualizar el estado cuando cambia la selección
		event.preventDefault();
	};
	const handleDateClick = arg => {
		const fechaFormateada = format(arg.date, 'yyyy-MM-dd');
		console.log(fechaFormateada);
		const fechaActual = format(new Date(), 'yyyy-MM-dd'); // Obtener la fecha actual
		console.log(fechaActual);
		if (fechaFormateada < fechaActual) {
			alert('La fecha seleccionada ya ha pasado.');
		} else {
			defaultValues();
			setModalShow(true);
			setDueDate(fechaFormateada);
		}
	};
	const handleEventClick = eventClickInfo => {
		const isAppointment =
			eventClickInfo.event.extendedProps.array !== undefined;

		if (isAppointment) {
			const eventDate = eventClickInfo.event.start;
			const formattedDate = format(eventDate, 'yyyy-MM-dd');
			const formattedTime = format(eventDate, 'HH:mm:ss');
			const paciente = eventClickInfo.event.extendedProps.array.patient;
			const motivoConsulta = eventClickInfo.event.extendedProps.array.id;
			const idAppointment = eventClickInfo.event.extendedProps.array.id;
			const fechaActual = format(new Date(), 'yyyy-MM-dd');
			console.log(fechaActual);
			if (formattedDate < fechaActual) {
				alert('La cita seleccionada ya ha pasado.');
			} else {
				setDueDate(formattedDate);
				setSelectedTime(formattedTime);
				setSelectedPatient('paciente');
				setReason(motivoConsulta);
				setStatus('exist');
				setModalShow(true);
				setIdAppointment(idAppointment);
			}
		} else {
			console.log('Este evento no es una cita');
		}
	};
	useEffect(() => {
		console.log(serviceData);
		fetchData();
		fetchData2();
		fetchData3();
	}, []);

	function fetchData() {
		const options = {
			method: 'GET',
			url: `https://test.habidd.com/api/scheduling/institutions/holidays.php?institution=${serviceData.id}`,
		};
		axios
			.request(options)
			.then(response => {
				console.log(response.data.data);
				return response;
			})
			.then(responseData => {
				if (responseData && responseData.data.data) {
					setHollidays(responseData.data.data);
				} else {
					setHollidays([]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	function fetchData2() {
		const options = {
			method: 'GET',
			url: `https://test.habidd.com/api/scheduling/appointments/list.php?institution=1&service=${1}`,
		};
		axios
			.request(options)
			.then(response => {
				console.log(response.data.data);
				return response;
			})
			.then(responseData => {
				if (responseData && responseData.data) {
					setAppointments(responseData.data.data);
				} else {
					setAppointments([]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	function fetchData3() {
		const options = {
			method: 'GET',
			url: `https://test.habidd.com/api/scheduling/patients/list.php?institution=${1}`,
		};
		axios
			.request(options)
			.then(response => {
				console.log(response.data);
				return response;
			})
			.then(responseData => {
				if (responseData && responseData.data.data) {
					setPatients(responseData.data.data);
				} else {
					setPatients([]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	const handleCancelAppointment = () => {
		const params = {
			institution: 1,
			service: 1,
			id: { idAppointment },
			status: 'canceled',
		};

		axios
			.put(
				'https://test.habidd.com/api/scheduling/appointments/edit.php',
				params,
			)
			.then(response => {
				console.log('Solicitud PUT exitosa:', response.data);
				setModalShow(false);
				console.log('CITA CANCELADA');
			})
			.catch(error => {
				console.error('Error en la solicitud PUT:', error);
				setModalShow(false);
				console.log('CITA CANCELADA');
			});
	};

	const handleConfirmAppointment = () => {
		const params = {
			institution: 1,
			service: 1,
			id: { idAppointment },
			status: 'confirmed',
		};
		axios
			.put(
				'https://test.habidd.com/api/scheduling/appointments/edit.php',
				params,
			)
			.then(response => {
				console.log('Solicitud PUT exitosa:', response.data);
				setModalShow(false);
				console.log('CITA CONFIRMADA');
			})
			.catch(error => {
				console.error('Error en la solicitud PUT:', error);
				setModalShow(false);
				console.log('CITA CONFIRMADA');
			});
	};
	const handleEditAppointment = () => {
		const dataToUpdate = {
			institution: 1,
			service: 1,
			id: { idAppointment },
			date: '2023-01-01',
			hour: '14:00:00',
		};
		axios
			.put(
				'https://test.habidd.com/api/scheduling/appointments/edit.php',
				dataToUpdate,
			)
			.then(response => {
				console.log('Respuesta exitosa:', response.data);
				setModalShow(false);
				console.log('CITA RE AGENDADA');
			})
			.catch(error => {
				console.error('Error en la solicitud:', error);
				setModalShow(false);
				console.log('CITA RE AGENDADA');
			});
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log(dueDate);
		console.log(selectedTime);
		const formData = {
			institution: 1,
			idType: 'cc', // Tipo de documento de identidad
			idNumber: '123456789', // Número de documento de identidad
			nameFirst: 'Juan', // Primer nombre del paciente
			nameSecond: 'Pérez', // Segundo nombre del paciente
			surnameFirst: 'González', // Primer apellido del paciente
			surnameSecond: 'López', // Segundo apellido del paciente
			birthday: '1990-01-15', // Fecha de nacimiento en formato YYYY-MM-DD
			phoneNumberMobile: '1234567890', // Número de teléfono móvil (opcional)
			email: 'juan@example.com', // Correo electrónico del paciente (opcional)
		};
		const appointmentData = {
			institution: 1,
			service: 1,
			patient: 1,
			date: '2023-01-01',
			hour: '14:00:00',
			duration: 30,
			notes: 'Nota opcional de la cita',
		};
		if (selectedPatient === 'nuevoPaciente') {
			axios
				.post(
					'https://test.habidd.com/api/scheduling/patients/create.php?institution=1',
					formData,
				)
				.then(response => {
					console.log('Solicitud exitosa', response.data);
					setModalShow(false);
					console.log('PACIENTE CREADO');
				})
				.catch(error => {
					console.error('Error en la solicitud', error);
					setModalShow(false);
					console.log('PACIENTE CREADO');
				});
			axios
				.post(
					'https://test.habidd.com/api/scheduling/appointments/create.php?institution=1&service=1',
					appointmentData,
				)
				.then(response => {
					console.log('Respuesta exitosa:', response.data);
					console.log('CITA CREADO');
					setModalShow(false);
				})
				.catch(error => {
					console.error('Error en la solicitud:', error);
					console.log('CITA CREADO');
					setModalShow(false);
				});
		} else {
			axios
				.post(
					'https://test.habidd.com/api/scheduling/appointments/create.php?institution=1&service=1',
					appointmentData,
				)
				.then(response => {
					console.log('Respuesta exitosa:', response.data);
					console.log('CITA CREADO');
					setModalShow(false);
				})
				.catch(error => {
					console.error('Error en la solicitud:', error);
					console.log('CITA CREADO');
					setModalShow(false);
				});
		}
	};

	return (
		<div>
			<Container fluid>
				<Row className='container1'>
					<Col className='container2'>
						<Col className='container3'>
							<Row className='custom-tittle'>
								<h4>Servicio solicitado</h4>
								<p>
									{serviceData.service.code} - {serviceData.service.name} -{' '}
									{serviceData.selectedProfessional}
								</p>
							</Row>
							<FullCalendar
								locale={esLocale}
								className='calendar'
								plugins={[dayGridPlugin, interactionPlugin]}
								dateClick={handleDateClick}
								headerToolbar={{
									left: 'prev',
									center: 'title',
									right: 'next',
								}}
								aspectRatio={2}
								events={[
									...hollidays.map((item, index) => ({
										title: 'CERRADO',
										date: item.date,
										color: '#F2A654',
										className: 'custom-event1',
									})),
									...appointments.map((item, index) => ({
										title: 'Ocupada',
										date: `${item.date}T${item.timeStart}`,
										display: 'block',
										color: '#54728c',
										array: item,
										className: 'custom-event2',
									})),
								]}
								eventTimeFormat={{
									hour: 'numeric',
									minute: '2-digit',
									meridiem: false,
								}}
								eventContent={arg => {
									return arg.event.title === 'CERRADO' ? (
										<div className='custom-event'>
											<p>{arg.event.title}</p>
										</div>
									) : (
										<div className='custom-event'>
											<p>
												<strong>{arg.timeText}</strong>
											</p>
											<p>{arg.event.title}</p> {/* CREAR ESTADO */}
										</div>
									);
								}}
								eventClick={handleEventClick}
							/>
						</Col>
					</Col>
				</Row>
			</Container>
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
							<Form.Group className='mb-3' controlId='formGrouService' change>
								<Form.Label>Servicio</Form.Label>
								<p>
									{serviceData.code} - {serviceData.name}
								</p>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formGroupDate'>
								<Form.Label>Fecha</Form.Label>
								<Form.Control
									type='date'
									placeholder='Due date'
									defaultValue={dueDate}
									onChange={handleDateChangee}
								/>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formGroupTime'>
								<Form.Label>Hora</Form.Label>
								<Form.Control
									type='time'
									placeholder='Hora'
									value={selectedTime}
									onChange={handleTimeChange}
								/>
							</Form.Group>
							<Form.Group className='mb-3' controlId='formGroupPatient'>
								<Form.Label>Paciente</Form.Label>
								{status === 'exist' ? (
									<Form.Control
										type='text'
										value={selectedPatient}
										readOnly
										className='read-only'
									/>
								) : (
									<Form.Select
										value={selectedPatient}
										onChange={handlePatientChange}
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
									<Form.Group className='mb-3' controlId='formGroupPatientName'>
										<Form.Label>Nombre del paciente</Form.Label>
										<Form.Control
											placeholder='Nombre(s)'
											value={name}
											onChange={e => setName(e.target.value)}
										/>
									</Form.Group>
									{/* Apellido del paciente: se muestra solo si se selecciona 'Nuevo paciente' */}
									<Form.Group
										className='mb-3'
										controlId='formGroupPatientLastName'
									>
										<Form.Label>Apellido del paciente</Form.Label>
										<Form.Control
											placeholder='Apellido(s)'
											value={lastName}
											onChange={e => setLastName(e.target.value)}
										/>
									</Form.Group>
									<Row className='mb-3'>
										<Form.Group as={Col} controlId='formGroupTypeDocument'>
											<Form.Label>Tipo de Documento</Form.Label>
											<Form.Select
												value={documentType}
												onChange={e => setDocumentType(e.target.value)}
											>
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
											<Form.Label>Documento de Identificación</Form.Label>
											<Form.Control
												placeholder='Documento'
												value={document}
												onChange={e => setDocument(e.target.value)}
											/>
										</Form.Group>
									</Row>
									<Row className='mb-3'>
										<Form.Group as={Col} controlId='formGroupDateOfBirth'>
											<Form.Label>Fecha de nacimiento</Form.Label>
											<Form.Control
												type='date'
												value={dateOfBirth}
												onChange={handleDateOfBirthChange}
											/>
										</Form.Group>

										<Form.Group as={Col} controlId='formGroupAge'>
											<Form.Label>Edad</Form.Label>
											<Form.Control
												type='text'
												value={age + ' años'}
												readOnly
												className='read-only'
											/>
										</Form.Group>
									</Row>
									<Row className='mb-3'>
										<Form.Group as={Col} controlId='formGroupPhoneNumber'>
											<Form.Label>Teléfono Celular</Form.Label>
											<Form.Control
												placeholder='Teléfono celular'
												value={phoneNumber}
												onChange={e => setPhoneNumber(e.target.value)}
											/>
										</Form.Group>
										<Form.Group as={Col} controlId='formGroupEmail'>
											<Form.Label>Email</Form.Label>
											<Form.Control
												type='email'
												placeholder='Email'
												value={email}
												onChange={e => setEmail(e.target.value)}
											/>
										</Form.Group>
									</Row>
								</>
							)}
							<Form.Group className='mb-3' controlId='formGroupReason'>
								<Form.Label>Motivo de consulta</Form.Label>
								{status === 'exist' ? (
									<Form.Control
										as='textarea'
										value={reason}
										readOnly
										className='read-only'
									/>
								) : (
									<Form.Control
										as='textarea'
										placeholder='Motivo'
										value={reason}
										onChange={handleReason}
									/>
								)}
							</Form.Group>
						</Row>
						<Row className='modal-footer'>
							<Button
								className='closeButton'
								onClick={() => {
									setModalShow(false);
									setStatus('new');
								}}
							>
								Cerrar
							</Button>
							{status === 'new' ? (
								<Button type='submit' className='registerButton'>
									Registrar
								</Button>
							) : (
								<>
									<Button
										type='button'
										className='registerButton'
										onClick={() => {
											handleCancelAppointment();
										}}
									>
										Cancelar
									</Button>
									<Button
										type='button'
										className='closeButton'
										onClick={() => {
											handleConfirmAppointment();
										}}
									>
										Confirmar
									</Button>
									<Button
										type='button'
										className='registerButton'
										onClick={() => {
											handleEditAppointment();
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
Calendar.propTypes = {
	serviceData: PropTypes.any,
};

export default Calendar;
