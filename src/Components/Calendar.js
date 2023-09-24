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

function Calendar({ serviceData }) {
	const [hollidays, setHollidays] = useState([]);
	const [appointments, setAppointments] = useState([]);
	const [modalShow, setModalShow] = React.useState(false);
	const [dueDate, setDueDate] = useState(null);
	const [patients, setPatients] = useState([]);

	const handleDateChangee = event => {
		setDueDate(event.target.value);
		event.preventDefault();
	};

	const handleDateClick = arg => {
		const fecha = arg.date;
		const dia = fecha.getDate().toString().padStart(2, '0');
		const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
		const año = fecha.getFullYear();
		const fechaFormateada = `${año}-${mes}-${dia}`;
		setModalShow(true);
		setDueDate(fechaFormateada);
	};

	useEffect(() => {
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
				console.log(response.data);
				return response;
			})
			.then(responseData => {
				if (responseData && responseData.data) {
					setAppointments(responseData.data.results);
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

	function ModalForm(props) {
		return (
			<Modal
				{...props}
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
					<Form className='form-modal'>
						<Form.Group className='mb-3' controlId='formGrouService'>
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
								value={dueDate}
								onChange={handleDateChangee}
							/>
						</Form.Group>
						<Form.Group className='mb-3' controlId='formGroupTime'>
							<Form.Label>Hora</Form.Label>
							<Form.Control type='time' placeholder='Hora' />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formGroupPatient'>
							<Form.Label>Paciente</Form.Label>
							<Form.Select>
								<option value='blanco'> </option>
								{patients.map((opcion, index) => (
									<option key={opcion.nameSecondindex} value={opcion}>
										{opcion.nameFirst} {} {opcion.surnameFirst}{' '}
										{opcion.surnameSecond}
									</option>
								))}
							</Form.Select>
						</Form.Group>
						<Form.Group className='mb-3' controlId='formGroupReason'>
							<Form.Label>Motivo de consulta</Form.Label>
							<Form.Control as='textArea' placeholder='Motivo' />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					{/* eslint-disable-next-line react/prop-types */}
					<Button className='closeButton' onClick={props.onHide}>
						Cerrar
					</Button>
					{/* eslint-disable-next-line react/prop-types */}
					<Button className='registerButton' onClick={props.onHide}>
						Registro
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}

	return (
		<div>
			<Container fluid>
				<Row className='container1'>
					<Col className='container2'>
						<Col className='container3'>
							<Row className='custom-tittle'>
								<h4>Servicio solicitado</h4>
								<p>
									{serviceData.code} - {serviceData.name}
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
							/>
						</Col>
					</Col>
				</Row>
			</Container>
			<ModalForm show={modalShow} onHide={() => setModalShow(false)} />
		</div>
	);
}
Calendar.propTypes = {
	serviceData: PropTypes.any,
};

export default Calendar;
