import axios from 'axios';

export const handleCancelAppointment = (idAppointment, setModalShow) => {
	const params = {
		institution: 1,
		service: 25,
		id: 49,
		status: 'canceled',
	};

	axios
		.delete(process.env.REACT_APP_DELETE_APPOINTMENT, params)
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
		id: idAppointment,
		status: 'confirmed',
	};
	axios
		.post(process.env.REACT_APP_CONFIRM_APPOINTMENT, params)
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
		id: idAppointment,
		date: '2023-12-25',
		hour: '14:00:00',
	};
	axios
		.put(process.env.REACT_APP_EDIT_APPOINTMENT, dataToUpdate)
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

export const handleCreateAppointment = (
	setModalShow,
	selectedPatient,
	sendemail,
	phoneNumber,
	dateOfBirth,
	isWhatsappChecked,
	isEmailChecked,
	isSmsChecked,
	documentType,
	document,
	serviceid,
	dueDate,
	selectedTime,
	durationTime,
	reason,
	selectedProfessional,
	name,
	lastName,
) => {
	const [firstName, secondName] = name.split(' ');
	const [firstLastName, secondLastName] = lastName.split(' ');
	const formData = {
		institution: 1,
		idType: documentType,
		idNumber: document,
		nameFirst: firstName,
		nameSecond: secondName,
		surnameFirst: firstLastName,
		surnameSecond: secondLastName,
		birthday: dateOfBirth,
		phoneNumberMobile: phoneNumber,
		email: sendemail,
		contactedWhatsapp: isWhatsappChecked,
		contactedEmail: isEmailChecked,
		contactedSms: isSmsChecked,
		contactedPhone: false,
	};
	const appointmentData = {
		institution: 1,
		service: serviceid,
		patient: selectedPatient,
		professional: selectedProfessional,
		date: dueDate,
		hour: selectedTime,
		duration: durationTime,
		notes: reason,
	};

	// SI SE SELECCIONA UN NUEVO PACIENTE PRIMERO SE HACE LA PETICION DE CREAR PACIENTE Y LUEGO LA PETICION DE CREAR CITA
	if (selectedPatient === 'nuevoPaciente') {
		axios
			.post(process.env.REACT_APP_CREATE_PATIENT, formData)
			.then(response => {
				console.log('Solicitud exitosa', response.data);
				selectedPatient = response.data.data.id;
				setModalShow(false);
				console.log('PACIENTE CREADO');
			})
			.catch(error => {
				console.error('Error en la solicitud', error);
				setModalShow(false);
				console.log('PACIENTE CREADO');
			});
		axios
			.post(process.env.REACT_APP_CREATE_APPOINTMENT, appointmentData)
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
			.post(process.env.REACT_APP_CREATE_APPOINTMENT, appointmentData)
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
	console.log({
		setModalShow,
		selectedPatient,
		sendemail,
		phoneNumber,
		dateOfBirth,
		isWhatsappChecked,
		isEmailChecked,
		isSmsChecked,
		documentType,
		document,
		serviceid,
		dueDate,
		selectedTime,
		durationTime,
		reason,
		selectedProfessional,
	});
};
