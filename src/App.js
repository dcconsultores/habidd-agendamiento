import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Services from './Components/Services/Services.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Calendar from './Components/Calendar/Calendar.js';
import CalendarAllServices from './Components/Calendar/CalendarAllServices.js';
import PatientAppointment from './Components/Patient/PatientAppointments';

function App() {
	const [service, setService] = useState([]);
	const [serviceData, setServiceData] = useState([]);
	return (
		<div className='App'>
			<Routes>
				<Route
					path='/'
					element={
						<Services
							setServiceData={setServiceData}
							service={service}
							setService={setService}
						/>
					}
				/>
				<Route
					path='/calendar/:id'
					element={<Calendar serviceData={serviceData} />}
				/>
				<Route
					path='/calendarAllServices'
					element={<CalendarAllServices service={service} />}
				/>
				<Route
					path='/PatientAppointment'
					element={
						<PatientAppointment
							setServiceData={setServiceData}
							service={service}
							setService={setService}
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
