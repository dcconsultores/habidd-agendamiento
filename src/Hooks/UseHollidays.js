import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UseHollidays = serviceData => {
	const [hollidays, setHollidays] = useState([]);
	useEffect(() => {
		console.log(serviceData);
		getHollidays();
	}, []);

	function getHollidays() {
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
					setHollidays(responseData.data.data);
				} else {
					setHollidays([]);
				}
			})
			.catch(error => {
				console.error(error);
			});
	}
	return {
		hollidays,
	};
};
