import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import '../../Stylesheets/Services/Services.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UseProfessionals } from '../../Hooks/Proffesionals/UseProfessionals.js';
import { useTranslation } from 'react-i18next';
import { serviceContext } from '../../App';

function Services({ setServiceData, setService }) {
	const service = useContext(serviceContext);
	const [t, i18n] = useTranslation('global');
	const { professionals } = UseProfessionals();
	const [selectedProfessional, setSelectedProfessional] = useState(
		t('Codes.SelectProfessional'),
	);

	useEffect(() => {
		getAllServices();
	}, []);
	const saveServiceData = service => {
		// Crear un objeto que contenga tanto el servicio como el profesional
		const serviceData = {
			service,
			selectedProfessional,
		};
		setServiceData(serviceData);
	};
	function getAllServices() {
		const options = {
			method: 'GET',
			url: `https://demo.habidd.com/api/scheduling/services/list.php?institution=${1}`,
		};
		axios
			.request(options)
			.then(response => {
				console.log(response);
				return response;
			})
			.then(responseData => {
				if (responseData && responseData.data) {
					setService(responseData.data.data);
				} else {
					setService([]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	return (
		<div>
			<Container fluid>
				<Row className='services-container'>
					<Col className='services-container__box'>
						<Col>
							<Form>
								<Form.Group>
									<Form.Select
										value={selectedProfessional}
										onChange={e => setSelectedProfessional(e.target.value)}
										className='services-container__select-professional'
									>
										<option value='Cualquier profesional'>
											{t('Codes.SelectProfessional')}
										</option>
										{professionals.map((opcion, index) => (
											<option key={opcion.id} value={`${opcion.id} `}>
												{opcion.nameFirst} {opcion.nameSecond}{' '}
												{opcion.surnameFirst} {opcion.surnameSecond}
											</option>
										))}
									</Form.Select>
								</Form.Group>
							</Form>
						</Col>

						<Table
							className='services-container__table'
							responsive
							bordered
							striped
						>
							<thead>
								<tr>
									<th>{t('Codes.Service')}</th>
									<th>{t('Codes.Duration')}</th>
									<th>{t('Codes.Action')}</th>
								</tr>
							</thead>
							<tbody>
								{service.map((item, index) => (
									<tr key={index}>
										<td>
											{item.code} - {item.name}
										</td>
										<td>{item.duration}</td>
										<td>
											<Link to={`/calendar/${item.id}`}>
												<Button onClick={() => saveServiceData(item)}>
													{t('Codes.GoTo')}
												</Button>
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
						<Col className='services-container__buttons'>
							<Link to={`/calendarAllServices`}>
								<Button onClick={() => console.log(service)}>
									{t('Codes.AllServices')}
								</Button>
							</Link>
							<Link to={`/dailyAppointments`}>
								<Button>{t('Codes.DailyAppointments')}</Button>
							</Link>
						</Col>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

Services.propTypes = {
	setServiceData: PropTypes.any,
	service: PropTypes.any,
	setService: PropTypes.any,
};

export default Services;
