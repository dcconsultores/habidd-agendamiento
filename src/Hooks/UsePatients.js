import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UsePatients = () => {
	const [patients, setPatients] = useState([]);
	useEffect(() => {
		fetchData3();
	}, []);

	function fetchData3() {
		const options = {
			method: 'GET',
			url: `https://test.habidd.com/api/scheduling/patients/list.php?institution=${1}`,
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
