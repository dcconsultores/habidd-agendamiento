import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UseHolidays = serviceData => {
	const [Holidays, setHolidays] = useState([]);
	useEffect(() => {
		console.log(serviceData);
		getHolidays();
	}, []);

	function getHolidays() {
		const options = {
			method: 'GET',
			url: `https://test.habidd.com/api/scheduling/institutions/holidays.php?institution=${serviceData.id}`,
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
