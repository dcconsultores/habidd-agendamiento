import axios from 'axios';
import { useState, useEffect } from 'react';
import '../Stylesheets/Services.css';

export const useProfessionals = () => {
	const [professionals, setProfessionals] = useState([]);
	function getAllProfessionals() {
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
		getAllProfessionals();
	}, []);
	return {
		professionals,
	};
};
