import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container, Row, Col } from 'react-bootstrap';
import '../Stylesheets/Calendar.css';
import axios from 'axios';
import esLocale from '@fullcalendar/core/locales/es';
import PropTypes from 'prop-types';

function Calendar({ serviceData }) {
	const [hollidays, setHollidays] = useState([]);
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {
		fetchData();
		fetchData2();
		console.log(serviceData);
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

	return (
		<div>
			<Container fluid>
				<Row className='p-5 m-0'>
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
										describe: 'HOO',
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
											<p>{arg.event.title}</p>
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
Calendar.propTypes = {
	serviceData: PropTypes.any,
};

export default Calendar;
