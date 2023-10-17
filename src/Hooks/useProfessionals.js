import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import '../Stylesheets/Services.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const useProfessionals = () => {
	const [professionals, setProfessionals] = useState([]);
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
	useEffect(() => {
		fetchData2();
	}, []);
	return {
		professionals,
	};
};
