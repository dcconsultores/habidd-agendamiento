import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UseAppointments = () => {
	const [appointments, setAppointments] = useState([]);
	function getAppointments() {
		const params = {
			institution: 1,
			service: 25,
		};
		const options = {
			method: 'GET',
			url: process.env.REACT_APP_SHOW_APPOINTMENTS,
			params,
		};
		axios
			.request(options)
			.then(response => {
				console.log(response.data.data);
				return response;
			})
			.then(responseData => {
				if (responseData && responseData.data) {
					setAppointments(responseData.data.data);
				} else {
					setAppointments([]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	useEffect(() => {
		getAppointments();
	}, []);
	return {
		appointments,
	};
};
