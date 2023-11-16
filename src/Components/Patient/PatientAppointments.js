import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import '../../Stylesheets/Patient/PatientAppointment.css';
import PropTypes from 'prop-types';
import { handleCancelAppointment } from '../../Data/Appointment';
import { UseAppointmentData } from '../../Hooks/Patients/UseAppointmentData';
import { isDatePast } from '../../Helpers/DateHelper';
function PatientAppointment({ setServiceData, service, setService }) {
	const { appointmentDataa } = UseAppointmentData();
	const [modalShow, setModalShow] = useState(false);

	const appointmentData = [
		{
			id: '1',
			institution: '1',
			service: '1',
			patientId: '1',
			date: '2024-01-01',
			hourFrom: '14:00:00',
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
			hourFrom: '14:00:00',
			hourTo: '14:30:00',
			reference: '1234567890',
			professional: 'Jhon Doee',
			status: 'Realizada',
		},
	];
	return (
		<div>
			<Container fluid>
				<Row className='appointments-container'>
					<Col className='appointments-container__box'>
						<Table
							className='appointments-container__table'
							responsive
							bordered
							striped
						>
							<thead>
								<tr>
									<th>Profesional</th>
									<th>Fecha</th>
									<th>Hora Inicio</th>
									<th>Hora Fin</th>
									<th>Estado</th>
									<th>Acción</th>
								</tr>
							</thead>
							<tbody>
								{appointmentData.map((item, index) => (
									<tr key={index}>
										<td>{item.professional}</td>
										<td>{item.date}</td>
										<td>{item.hourFrom}</td>
										<td>{item.hourTo}</td>
										<td>{item.status}</td>
										<td>
											<Button
												onClick={
													() => handleCancelAppointment(item.id, setModalShow) // Cancel Appointment
												}
												disabled={isDatePast(item.date)}
												className={isDatePast(item.date) ? 'grayButton' : ''}
											>
												Cancelar
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

PatientAppointment.propTypes = {
	setServiceData: PropTypes.any,
	service: PropTypes.any,
	setService: PropTypes.any,
};

export default PatientAppointment;
