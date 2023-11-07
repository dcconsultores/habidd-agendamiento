/* eslint-disable no-undef */
import React from 'react'; // Importa React
import { render, fireEvent, screen } from '@testing-library/react';
import ModalForm from '../Components/Form/ModalForm';
import '@testing-library/jest-dom';

test('changes due date and selected time', () => {
	const setSelectedTime = jest.fn();
	const setDueDate = jest.fn();
	const setModalShow = jest.fn();
	const setStatus = jest.fn();
	const setSelectedPatient = jest.fn();
	const serviceData = {
		service: {
			id: '25',
			code: '101',
			name: 'General adultos',
			modes: 'Extramural - Domiciliario',
			duration: 15,
			color: '#FF4445',
		},
		selectedProfessional: 'Juan',
	};
	const component = render(
		<ModalForm
			serviceData={serviceData}
			dueDate={'2023-10-10'}
			patients={[
				{
					nameFirst: 'Jhon',
					nameSecond: 'Doe',
					surnameFirst: 'Joe',
					surnameSecond: 'Done',
					id: 1,
				},
			]}
			status={'new'}
			lastName={'Jhon'}
			documentType={'cc'}
			document={1111111}
			dateOfBirth={'2001-10-10'}
			name={'Jhon'}
			phoneNumber={'3104444444'}
			email={'jhondoe@gmail.com'}
			reason={'Fever'}
			idAppointment={1}
			setSelectedTime={setSelectedTime}
			setDueDate={setDueDate}
			setModalShow={setModalShow}
			modalShow={true}
			setStatus={setStatus}
			setSelectedPatient={setSelectedPatient}
		/>,
	);
	expect(component).toMatchSnapshot();
	const newDueDate = '2023-11-01';
	const newTime = '10:00';

	// Change the due date
	fireEvent.change(screen.getByLabelText('Fecha'), {
		target: { value: newDueDate },
	});

	// Change the selected time
	fireEvent.change(screen.getByLabelText('Hora'), {
		target: { value: newTime },
	});

	expect(screen.getByText('Solicitud de cita')).toBeInTheDocument();
	fireEvent.click(screen.getByText('Cerrar'));
});
