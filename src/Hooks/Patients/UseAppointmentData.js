import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UseAppointmentData = id => {
	const [appointment, setAppointment] = useState([]);
	useEffect(() => {
		getAppointments();
	}, []);

	function getAppointments() {
		const options = {
			method: 'GET',
			url: `https://test.habidd.com/api/scheduling/appointments/search.php?institution=1&service=1&PatientId=${1}`,
		};
		axios
			.request(options)
			.then(response => {
				console.log(response.data.data);
				return response;
			})
			.then(responseData => {
				if (responseData && responseData.data.data) {
					setAppointment(responseData.data.data);
				} else {
					setAppointment([]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}
	return {
		appointment,
	};
};
