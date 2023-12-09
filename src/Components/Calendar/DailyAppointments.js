import React, { useState, useEffect, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container, Row, Col, Form } from 'react-bootstrap';
import esLocale from '@fullcalendar/core/locales/es';
import PropTypes from 'prop-types';
import '../../Stylesheets/Calendar/DailyAppointments.css';
import { UseHolidays } from '../../Hooks/Holidays/UseHolidays.js';
import { useAllAppointments } from '../../Hooks/Appointments/UseAllAppointments.js';
import { UseProfessionals } from '../../Hooks/Proffesionals/UseProfessionals';
import { getCurrentDateFormatted } from '../../Helpers/DateHelper';
import { useTranslation } from 'react-i18next';
import { serviceContext } from '../../App';

function DailyAppointments() {
	const [t, i18n] = useTranslation('global');
	const service = useContext(serviceContext);
	const { Holidays } = UseHolidays(service);
	const { allAppointments } = useAllAppointments(service);
	const { professionals } = UseProfessionals();
	const [selectedProfessional, setSelectedProfessional] = useState(
		t('Codes.AllProfessionals'),
	);
	const appointmentData = [
		{
			id: '1',
			institution: '1',
			service: '1',
			patientId: '1',
			date: '2024-01-01',
			hourFrom: '09:00:00',
			hourTo: '14:30:00',
			reference: '1234567890',
			professional: 'Jhon Doe',
			status: 'Pendiente',
		},
		{
			id: '1',
			institution: '1',
			service: '1',
			patientId: '1',
			date: '2023-01-01',
			hourFrom: '10:00:00',
			hourTo: '14:30:00',
			reference: '1234567890',
			professional: 'Jhon Doee',
			status: 'Realizada',
		},
	];
	const [selectedService, setSelectedService] = useState(
		t('Codes.AllServices'),
	);

	const filteredAppointments = allAppointments.filter(item => {
		const professionalFilter =
			!selectedProfessional ||
			selectedProfessional === 'Todos los profesionales' ||
			item.timeStart === selectedProfessional;

		const serviceFilter =
			!selectedService ||
			selectedService === 'Todos los servicios' ||
			item.serviceName === selectedService;

		return professionalFilter && serviceFilter;
	});
	return (
		<div>
			<Container fluid>
				<Row className='daily-calendar-container'>
					<Col className='daily-calendar-container__box'>
						<Col className='daily-calendar-container__today'>
							{getCurrentDateFormatted()}
						</Col>
						<Col className='daily-calendar-container__calendar'>
							<Col className='daily-calendar-container__filter'>
								<Col className='daily-calendar-container__professional'>
									<Form>
										<Form.Group>
											<Form.Select
												value={selectedProfessional}
												onChange={e => setSelectedProfessional(e.target.value)}
												className='services-container__select-professional'
											>
												<option value='Todos los profesionales'>
													{t('Codes.AllProfessionals')}
												</option>
												{appointmentData.map((opcion, index) => (
													<option key={opcion.id} value={`${opcion.hourFrom}`}>
														{opcion.hourFrom}
													</option>
												))}
											</Form.Select>
										</Form.Group>
									</Form>
								</Col>
								<Col className='daily-calendar-container__service'>
									<Form>
										<Form.Group>
											<Form.Select
												value={selectedService}
												onChange={e => setSelectedService(e.target.value)}
												className='services-container__select-service'
											>
												<option value='Todos los servicios'>
													{t('Codes.AllServices')}
												</option>
												{service.map((opcion, index) => (
													<option key={opcion.id} value={`${opcion.name}`}>
														{opcion.code} - {opcion.name}
													</option>
												))}
											</Form.Select>
										</Form.Group>
									</Form>
								</Col>
							</Col>
							<FullCalendar
								locale={esLocale}
								className='daily-calendar-container__fullcalendar'
								plugins={[dayGridPlugin, interactionPlugin]}
								initialView='dayGridDay'
								headerToolbar={false}
								aspectRatio={2}
								events={[
									...Holidays.map((item, index) => ({
										title: t('Codes.Closed'),
										date: item.date,
										color: '#F2A654',
										className: 'daily-calendar-container__Holidays',
									})),
									...filteredAppointments.map((item, index) => ({
										title: item.serviceName,
										date: `${item.date}T${item.timeStart}`,
										display: 'block',
										color: '#54728c',
										className: 'daily-calendar-container__appointments',
									})),
								]}
								eventTimeFormat={{
									hour: 'numeric',
									minute: '2-digit',
									meridiem: false,
								}}
								eventContent={arg => {
									return arg.event.title === t('Codes.Closed') ? (
										<div className='daily-calendar-container__custom-event'>
											<p>{arg.event.title}</p>
										</div>
									) : (
										<div className='daily-calendar-container__custom-event'>
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
		</div>
	);
}

DailyAppointments.propTypes = {
	service: PropTypes.any,
};
export default DailyAppointments;
