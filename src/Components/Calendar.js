import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Container, Row, Col } from 'react-bootstrap';
import '../Stylesheets/Calendar.css';
import esLocale from '@fullcalendar/core/locales/es';
import PropTypes from 'prop-types';

function Calendar({ serviceData }) {
	return (
		<div>
			<Container fluid>
				<Row className=' p-5 m-0'>
					<Col className='container2'>
						<Col className='container3'>
							<Row className='custom-tittle'>
								<h4>Servicio solicitado</h4>
								<p>101 - odontologia</p>
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
								eventTimeFormat={{
									hour: 'numeric',
									minute: '2-digit',
									meridiem: false,
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
