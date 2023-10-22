import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container, Row, Col } from 'react-bootstrap';
import '../Stylesheets/Calendar.css';
import esLocale from '@fullcalendar/core/locales/es';
import PropTypes from 'prop-types';
import { UseHollidays } from '../Hooks/UseHollidays';
import { UseAppointments } from '../Hooks/UseAppointments';
import { UsePatients } from '../Hooks/UsePatients';
import ModalForm from './ModalForm';
import {
	getHourMinuteSecond,
	getYearMonthDay,
	calculateAge,
} from '../Helpers/DateHelper.js';

function Calendar({ serviceData }) {
	const { hollidays } = UseHollidays(serviceData);
	const { appointments } = UseAppointments();
	const [modalShow, setModalShow] = useState(false);
	const [dueDate, setDueDate] = useState(null);
	const { patients } = UsePatients();
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
	const age = calculateAge(dateOfBirth);

	const handleDateClick = arg => {
		const fechaFormateada = getYearMonthDay(arg.date);
		console.log(fechaFormateada);
		const fechaActual = getYearMonthDay(new Date()); // Obtener la fecha actual
		console.log(fechaActual);
		// VERIFICAR QUE LA FECHA NO HAYA PASADO
		if (fechaFormateada < fechaActual) {
			alert('La fecha seleccionada ya ha pasado.');
		} else {
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
			setModalShow(true);
			setDueDate(fechaFormateada);
		}
	};
	const handleEventClick = eventClickInfo => {
		const isAppointment =
			eventClickInfo.event.extendedProps.array !== undefined;

		if (isAppointment) {
			const eventDate = eventClickInfo.event.start;
			const formattedDate = getYearMonthDay(eventDate);
			const formattedTime = getHourMinuteSecond(eventDate);
			const paciente = eventClickInfo.event.extendedProps.array.patient;
			const motivoConsulta = eventClickInfo.event.extendedProps.array.id;
			const idAppointment = eventClickInfo.event.extendedProps.array.id;
			const fechaActual = getYearMonthDay(new Date());
			console.log(fechaActual);
			// VERIFICAR QUE LA FECHA NO HAYA PASADO
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

	return (
		<div>
			<Container fluid>
				<Row className='calendar-container'>
					<Col className='calendar-container__box'>
						<Col className='calendar-container__calendar'>
							<Row className='calendar-container__custom-tittle'>
								<h4>Servicio solicitado</h4>
								<p>
									{serviceData.service.code} - {serviceData.service.name} -{' '}
									{serviceData.selectedProfessional}
								</p>
							</Row>
							<FullCalendar
								locale={esLocale}
								className='calendar-container__fullcalendar'
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
										className: 'calendar-container__hollidays',
									})),
									...appointments.map((item, index) => ({
										title: 'Ocupada',
										date: `${item.date}T${item.timeStart}`,
										display: 'block',
										color: '#54728c',
										array: item,
										className: 'calendar-container__appointments',
									})),
								]}
								eventTimeFormat={{
									hour: 'numeric',
									minute: '2-digit',
									meridiem: false,
								}}
								eventContent={arg => {
									return arg.event.title === 'CERRADO' ? (
										<div className='calendar-container__custom-event'>
											<p>{arg.event.title}</p>
										</div>
									) : (
										<div className='calendar-container__custom-event'>
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
			<ModalForm
				serviceData={serviceData}
				modalShow={modalShow}
				setModalShow={setModalShow}
				dueDate={dueDate}
				setDueDate={setDueDate}
				selectedTime={selectedTime}
				setSelectedTime={setSelectedTime}
				selectedPatient={selectedPatient}
				setSelectedPatient={setSelectedPatient}
				patients={patients}
				setName={setName}
				status={status}
				lastName={lastName}
				setLastName={setLastName}
				documentType={documentType}
				setDocumentType={setDocumentType}
				setDocument={setDocument}
				document={document}
				dateOfBirth={dateOfBirth}
				setDateOfBirth={setDateOfBirth}
				name={name}
				age={age}
				phoneNumber={phoneNumber}
				setPhoneNumber={setPhoneNumber}
				email={email}
				setEmail={setEmail}
				reason={reason}
				setReason={setReason}
				setStatus={setStatus}
				idAppointment={idAppointment}
			/>
		</div>
	);
}
Calendar.propTypes = {
	serviceData: PropTypes.any,
};

export default Calendar;
