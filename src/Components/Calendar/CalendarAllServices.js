import React, { useState, useEffect, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container, Row, Col } from 'react-bootstrap';
import esLocale from '@fullcalendar/core/locales/es';
import PropTypes from 'prop-types';
import '../../Stylesheets/Calendar/CalendarAllServices.css';
import { UseHolidays } from '../../Hooks/Holidays/UseHolidays.js';
import { useAllAppointments } from '../../Hooks/Appointments/UseAllAppointments.js';
import { useTranslation } from 'react-i18next';
import { serviceContext } from '../../App';

function CalendarAllServices() {
	const service = useContext(serviceContext);
	const [t, i18n] = useTranslation('global');
	const { Holidays } = UseHolidays(service);
	const { allAppointments } = useAllAppointments(service);
	return (
		<div>
			<Container fluid>
				<Row className='calendar-container'>
					<Col className='calendar-container__box'>
						<Col className='calendar-container__calendar'>
							<Row className='calendar-container__custom-tittle'>
								<h4>{t('Codes.SelectedService')}</h4>
								<p>{t('Codes.AllServices')}</p>
							</Row>
							<FullCalendar
								locale={esLocale}
								className='calendar-container__fullcalendar'
								plugins={[dayGridPlugin, interactionPlugin]}
								initialView='dayGridWeek'
								headerToolbar={{
									left: 'prev,next',
									center: 'title',
									right: 'dayGridWeek,dayGridDay',
								}}
								aspectRatio={2}
								events={[
									...Holidays.map((item, index) => ({
										title: t('Codes.Closed'),
										date: item.date,
										color: '#F2A654',
										className: 'calendar-container__Holidays',
									})),
									...allAppointments.map((item, index) => ({
										title: item.serviceName,
										date: `${item.date}T${item.timeStart}`,
										display: 'block',
										color: '#54728c',
										className: 'calendar-container__appointments',
									})),
								]}
								eventTimeFormat={{
									hour: 'numeric',
									minute: '2-digit',
									meridiem: false,
								}}
								eventContent={arg => {
									return arg.event.title === t('Codes.Closed') ? (
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
							/>
						</Col>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

CalendarAllServices.propTypes = {
	service: PropTypes.any,
};
export default CalendarAllServices;
