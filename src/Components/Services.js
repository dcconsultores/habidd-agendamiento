import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import '../Stylesheets/Services.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Services({ setServiceData, service, setService }) {
	useEffect(() => {
		fetchData();
	}, []);
	const saveServiceData = service => {
		setServiceData(service);
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
	return (
		<div>
			<Container fluid>
				<Row className='container1'>
					<Col className='container'>
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
