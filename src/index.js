import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import globalEs from './Translations/es/global.json';

const root = ReactDOM.createRoot(document.getElementById('root'));

i18next.init({
	interpolation: { escapeValue: false },
	lng: 'es',
	resources: {
		es: {
			global: globalEs,
		},
	},
});
root.render(
	<I18nextProvider i18n={i18next}>
		<Router>
			<App />
		</Router>
		,
	</I18nextProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
