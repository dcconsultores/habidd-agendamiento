import axios from 'axios';

export const handleCancelAppointment = (idAppointment, setModalShow) => {
	const params = {
		institution: 1,
		service: 1,
		id: { idAppointment },
		status: 'canceled',
	};

	axios
		.put('https://demo.habidd.com/api/scheduling/appointments/edit.php', params)
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
		.put('https://demo.habidd.com/api/scheduling/appointments/edit.php', params)
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
			'https://demo.habidd.com/api/scheduling/appointments/edit.php',
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
		idType: 'CC',
		idNumber: '12345678',
		nameFirst: 'Juan',
		nameSecond: 'Carlos',
		surnameFirst: 'Gómez',
		surnameSecond: 'López',
		birthday: '1990-01-15',
		phoneNumberMobile: 123456789,
		email: 'juan.carlos@example.com',
		contactedWhatsapp: true,
		contactedEmail: false,
		contactedSms: true,
		contactedPhone: false,
	};
	const appointmentData = {
		institution: 1,
		service: 1,
		patient: 123,
		professional: 456,
		date: '2023-12-07',
		hour: '09:00',
		duration: 60,
		notes: 'Consulta regular',
	};
	// SI SE SELECCIONA UN NUEVO PACIENTE PRIMERO SE HACE LA PETICION DE CREAR PACIENTE Y LUEGO LA PETICION DE CREAR CITA
	if (selectedPatient === 'nuevoPaciente') {
		axios
			.post(
				'  https://demo.habidd.com/api/scheduling/patients/create.php',
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
				'https://demo.habidd.com/api/scheduling/appointments/create.php',
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
				'https://demo.habidd.com/api/scheduling/appointments/create.php',
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
