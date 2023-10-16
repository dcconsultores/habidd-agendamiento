import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useAllAppointments = service => {
	const [allAppointments, setAllAppointments] = useState([]); // Almacenar todos los appointments aquí

	useEffect(() => {
		console.log(service);
		// Llamar a fetchData2 para cada servicio
		service.map(item => fetchData2(item.id, item.name));
		console.log(allAppointments);
	}, [service]);

	function fetchData2(serviceId, serviceName) {
		const options = {
			method: 'GET',
			url: `https://test.habidd.com/api/scheduling/appointments/list.php?institution=1&service=${serviceId}`,
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
