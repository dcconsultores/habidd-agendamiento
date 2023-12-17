import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UseHolidays = serviceData => {
	const [Holidays, setHolidays] = useState([]);
	useEffect(() => {
		console.log(serviceData);
		getHolidays();
	}, []);

	function getHolidays() {
		const params = {
			institution: 1,
		};
		const options = {
			method: 'GET',
			url: process.env.REACT_APP_SHOW_HOLIDAYS,
			params,
		};
		axios
			.request(options)
			.then(response => {
				console.log(response.data.data);
				return response;
			})
			.then(responseData => {
				if (responseData && responseData.data.data) {
					setHolidays(responseData.data.data);
				} else {
					setHolidays([]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}
	return {
		Holidays,
	};
};
