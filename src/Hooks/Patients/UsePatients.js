import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UsePatients = () => {
	const [patients, setPatients] = useState([]);
	useEffect(() => {
		getPatients();
	}, []);

	function getPatients() {
		const params = {
			institution: 1,
		};
		const options = {
			method: 'GET',
			url: process.env.REACT_APP_SHOW_PATIENTS,
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
					setPatients(responseData.data.data);
				} else {
					setPatients([]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}
	return {
		patients,
	};
};
