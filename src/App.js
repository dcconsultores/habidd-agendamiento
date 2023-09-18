import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Services from './Components/Services';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Calendar from './Components/Calendar';

function App() {
	const [serviceData, setServiceData] = useState([]);
	return (
		<div className='App'>
			<Routes>
				<Route
					path='/'
					element={<Services setServiceData={setServiceData} />}
				/>
				<Route
					path='/calendar/:id'
					element={<Calendar serviceData={serviceData} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
