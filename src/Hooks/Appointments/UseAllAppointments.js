import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useAllAppointments = service => {
	const [allAppointments, setAllAppointments] = useState([]); // Almacenar todos los appointments aquí

	useEffect(() => {
		console.log(service);
		// Llamar a fetchData2 para cada servicio
		service.map(item => getAllAppointments(item.id, item.name));
		console.log(allAppointments);
	}, [service]);

	function getAllAppointments(serviceId, serviceName) {
		const params = {
			institution: 1,
			service: serviceId,
		};
		const options = {
			method: 'GET',
			url: process.env.REACT_APP_SHOW_APPOINTMENTS,
			params,
		};
		axios
			.request(options)
			.then(response => {
				if (response.data && response.data.data) {
					// Agregar el nombre del servicio a cada appointment y luego agregarlos al estado
					const appointmentsWithServiceName = response.data.data.map(
						appointment => ({
							...appointment,
							serviceName,
						}),
					);
					setAllAppointments(prevAppointments => [
						...prevAppointments,
						...appointmentsWithServiceName,
					]);
				}
				console.log(serviceId);
				console.log(response.data.results);
			})
			.catch(error => {
				console.error(error);
			});
	}
	return {
		allAppointments,
	};
};
