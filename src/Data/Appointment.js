import axios from 'axios';

export const handleCancelAppointment = (idAppointment, setModalShow) => {
	const params = {
		institution: 1,
		service: 1,
		id: { idAppointment },
		status: 'canceled',
	};

	axios
		.put('https://test.habidd.com/api/scheduling/appointments/edit.php', params)
		.then(response => {
			console.log('Solicitud PUT exitosa:', response.data);
			setModalShow(false);
			console.log('CITA CANCELADA');
		})
		.catch(error => {
			console.error('Error en la solicitud PUT:', error);
			setModalShow(false);
			console.log('CITA CANCELADA');
		});
};

export const handleConfirmAppointment = (idAppointment, setModalShow) => {
	const params = {
		institution: 1,
		service: 1,
		id: { idAppointment },
		status: 'confirmed',
	};
	axios
		.put('https://test.habidd.com/api/scheduling/appointments/edit.php', params)
		.then(response => {
			console.log('Solicitud PUT exitosa:', response.data);
			setModalShow(false);
			console.log('CITA CONFIRMADA');
		})
		.catch(error => {
			console.error('Error en la solicitud PUT:', error);
			setModalShow(false);
			console.log('CITA CONFIRMADA');
		});
};
export const handleEditAppointment = (idAppointment, setModalShow) => {
	const dataToUpdate = {
		institution: 1,
		service: 1,
		id: { idAppointment },
		date: '2023-01-01',
		hour: '14:00:00',
	};
	axios
		.put(
			'https://test.habidd.com/api/scheduling/appointments/edit.php',
			dataToUpdate,
		)
		.then(response => {
			console.log('Respuesta exitosa:', response.data);
			setModalShow(false);
			console.log('CITA RE AGENDADA');
		})
		.catch(error => {
			console.error('Error en la solicitud:', error);
			setModalShow(false);
			console.log('CITA RE AGENDADA');
		});
};

export const handleCreateAppointment = (setModalShow, selectedPatient) => {
	const formData = {
		institution: 1,
		idType: 'cc', // Tipo de documento de identidad
		idNumber: '123456789', // Número de documento de identidad
		nameFirst: 'Juan', // Primer nombre del paciente
		nameSecond: 'Pérez', // Segundo nombre del paciente
		surnameFirst: 'González', // Primer apellido del paciente
		surnameSecond: 'López', // Segundo apellido del paciente
		birthday: '1990-01-15', // Fecha de nacimiento en formato YYYY-MM-DD
		phoneNumberMobile: '1234567890', // Número de teléfono móvil (opcional)
		email: 'juan@example.com', // Correo electrónico del paciente (opcional)
	};
	const appointmentData = {
		institution: 1,
		service: 1,
		patient: 1,
		date: '2023-01-01',
		hour: '14:00:00',
		duration: 30,
		notes: 'Nota opcional de la cita',
	};
	// SI SE SELECCIONA UN NUEVO PACIENTE PRIMERO SE HACE LA PETICION DE CREAR PACIENTE Y LUEGO LA PETICION DE CREAR CITA
	if (selectedPatient === 'nuevoPaciente') {
		axios
			.post(
				'https://test.habidd.com/api/scheduling/patients/create.php?institution=1',
				formData,
			)
			.then(response => {
				console.log('Solicitud exitosa', response.data);
				setModalShow(false);
				console.log('PACIENTE CREADO');
			})
			.catch(error => {
				console.error('Error en la solicitud', error);
				setModalShow(false);
				console.log('PACIENTE CREADO');
			});
		axios
			.post(
				'https://test.habidd.com/api/scheduling/appointments/create.php?institution=1&service=1',
				appointmentData,
			)
			.then(response => {
				console.log('Respuesta exitosa:', response.data);
				console.log('CITA CREADO');
				setModalShow(false);
			})
			.catch(error => {
				console.error('Error en la solicitud:', error);
				console.log('CITA CREADO');
				setModalShow(false);
			});
	} else {
		axios
			.post(
				'https://test.habidd.com/api/scheduling/appointments/create.php?institution=1&service=1',
				appointmentData,
			)
			.then(response => {
				console.log('Respuesta exitosa:', response.data);
				console.log('CITA CREADO');
				setModalShow(false);
			})
			.catch(error => {
				console.error('Error en la solicitud:', error);
				console.log('CITA CREADO');
				setModalShow(false);
			});
	}
};
