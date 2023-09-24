import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import esLocale from '@fullcalendar/core/locales/es';
import PropTypes from 'prop-types';
import '../Stylesheets/CalendarAllServices.css';

function CalendarAllServices({ service }) {
	const [hollidays, setHolidays] = useState([]);
	const [allAppointments, setAllAppointments] = useState([]); // Almacenar todos los appointments aquí

	useEffect(() => {
		fetchData();
		// Llamar a fetchData2 para cada servicio
		service.map(item => fetchData2(item.id, item.name));
	}, []); // Agregar 'service' como dependencia para que se actualice cuando cambie

	function fetchData() {
		const options = {
			method: 'GET',
			url: `https://test.habidd.com/api/scheduling/institutions/holidays.php?institution=1`,
		};
		axios
			.request(options)
			.then(response => {
				if (response.data && response.data.data) {
					setHolidays(response.data.data);
				} else {
					setHolidays([]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	function fetchData2(serviceId, serviceName) {
		const options = {
			method: 'GET',
			url: `https://test.habidd.com/api/scheduling/appointments/list.php?institution=1&service=${serviceId}`,
		};
		axios
			.request(options)
			.then(response => {
				if (response.data && response.data.results) {
					// Agregar el nombre del servicio a cada appointment y luego agregarlos al estado
					const appointmentsWithServiceName = response.data.results.map(
						appointment => ({
							...appointment,
							serviceName,
						}),
					);
					setAllAppointments(prevAppointments => [
						...prevAppointments,
						...appointmentsWithServiceName,
					]);
				}
				console.log(allAppointments);
			})
			.catch(error => {
				console.error(error);
			});
	}
	return (
		<div>
			<Container fluid>
				<Row className='container1'>
					<Col className='container2'>
						<Col className='container3'>
							<Row className='custom-tittle'>
								<h4>Servicio solicitado</h4>
								<p>Todos los servicios</p>
							</Row>
							<FullCalendar
								locale={esLocale}
								className='calendar'
								plugins={[dayGridPlugin, interactionPlugin]}
								initialView='dayGridWeek'
								headerToolbar={{
									left: 'prev,next',
									center: 'title',
									right: ' ',
								}}
								aspectRatio={2}
								events={[
									...hollidays.map((item, index) => ({
										title: 'CERRADO',
										date: item.date,
										color: '#F2A654',
										className: 'custom-event1',
									})),
									...allAppointments.map((item, index) => ({
										title: item.serviceName,
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
		</div>
	);
}

CalendarAllServices.propTypes = {
	service: PropTypes.any,
};
export default CalendarAllServices;
