import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UseAppointments = () => {
	const [appointments, setAppointments] = useState([]);
	function getAppointments() {
		const options = {
			method: 'GET',
			url: `https://test.habidd.com/api/scheduling/appointments/list.php?institution=1&service=${1}`,
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
