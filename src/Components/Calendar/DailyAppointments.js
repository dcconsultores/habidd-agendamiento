import React, { useState, useEffect } from 'react';
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

function DailyAppointments({ service }) {
	const { Holidays } = UseHolidays(service);
	const { allAppointments } = useAllAppointments(service);

	return (
		<div>
			<Container fluid>
				<Row className='daily-calendar-container'>
					<Col className='daily-calendar-container__box'>
						<Col className='daily-calendar-container__today'>
							{getCurrentDateFormatted()}
						</Col>
						<Col className='daily-calendar-container__calendar'>
							<FullCalendar
								locale={esLocale}
								className='daily-calendar-container__fullcalendar'
								plugins={[dayGridPlugin, interactionPlugin]}
								initialView='dayGridDay'
								headerToolbar={false}
								aspectRatio={2}
								events={[
									...Holidays.map((item, index) => ({
										title: 'CERRADO',
										date: item.date,
										color: '#F2A654',
										className: 'daily-calendar-container__Holidays',
									})),
									...allAppointments.map((item, index) => ({
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
									return arg.event.title === 'CERRADO' ? (
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
