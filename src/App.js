import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Services from './Components/Services/Services';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Calendar from './Components/Calendar/Calendar';
import CalendarAllServices from './Components/Calendar/CalendarAllServices';

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
			</Routes>
		</div>
	);
}

export default App;
