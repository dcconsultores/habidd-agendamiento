import axios from 'axios';
import { useState, useEffect } from 'react';

export const UseProfessionals = () => {
	const [professionals, setProfessionals] = useState([]);
	function getAllProfessionals() {
		const params = {
			institution: 1,
		};
		const options = {
			method: 'GET',
			url: process.env.REACT_APP_SHOW_PROFESSIONALS,
			params,
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
