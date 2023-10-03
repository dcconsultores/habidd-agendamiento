import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import '../Stylesheets/Services.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Services({ setServiceData, service, setService }) {
	const [selectedProfessional, setSelectedProfessional] = useState(
		'Cualquier profesional',
	);
	const [profesionals, setProfessionals] = useState([]);
	useEffect(() => {
		fetchData();
		fetchData2();
	}, []);
	const saveServiceData = (service, professional) => {
		// Crear un objeto que contenga tanto el servicio como el profesional
		const serviceData = {
			service,
			selectedProfessional,
		};
		setServiceData(serviceData);
	};
	function fetchData() {
		const options = {
			method: 'GET',
			url: `https://test.habidd.com/api/scheduling/services/list.php?institution=${1}`,
		};
		axios
			.request(options)
			.then(response => {
				console.log(response.data.data);
				return response;
			})
			.then(responseData => {
				if (responseData && responseData.data.data) {
					setService(responseData.data.data);
				} else {
					setService([]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}
	function fetchData2() {
		const options = {
			method: 'GET',
			url: `https://test.habidd.com/api/scheduling/professionals/list.php?institution=${1}`,
		};
		axios
			.request(options)
			.then(response => {
				console.log(response.data);
				return response;
			})
			.then(responseData => {
				if (responseData && responseData.data.data) {
					setProfessionals(responseData.data.data);
				} else {
					setProfessionals([]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	return (
		<div>
			<Container fluid>
				<Row className='container1'>
					<Col className='container'>
						<Col>
							<Form>
								<Form.Group>
									<Form.Select
										value={selectedProfessional}
										onChange={e => setSelectedProfessional(e.target.value)}
										className='container-select'
									>
										<option value='Cualquier profesional'>
											Cualquier profesional
										</option>
										{profesionals.map((opcion, index) => (
											<option
												key={opcion.id}
												value={`${opcion.nameFirst} ${opcion.surnameFirst}`}
											>
												{opcion.nameFirst} {opcion.nameSecond}{' '}
												{opcion.surnameFirst} {opcion.surnameSecond}
											</option>
										))}
									</Form.Select>
								</Form.Group>
							</Form>
						</Col>

						<Table className='table-container' responsive bordered striped>
							<thead>
								<tr>
									<th>Servicio</th>
									<th>Duracion min</th>
									<th>Acciones</th>
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
													Solicitar
												</Button>
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
						<Col>
							<Link to={`/calendarAllServices`}>
								<Button onClick={() => console.log(service)}>
									Todos los servicios
								</Button>
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
