/* eslint-disable no-undef */
import React from 'react'; // Importa React
import Calendar from '../Components/Calendar/Calendar';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
test('renders content', () => {
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
	const Component = render(<Calendar serviceData={serviceData} />);
	expect(Component).toMatchSnapshot();
	// Verifica que el título del servicio se muestre en el componente renderizado
	expect(screen.getByText('Servicio solicitado')).toBeInTheDocument();
	// expect(screen.getByText(serviceData.service.name)).toBeInTheDocument();
	expect(screen.getByText('101 - General adultos - Juan')).toBeInTheDocument();
	// Simula un clic en una fecha en el calendario
	fireEvent.click(screen.getByText('31'));
});
