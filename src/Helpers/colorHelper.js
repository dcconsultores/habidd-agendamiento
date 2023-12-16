export function getStatusColor(status) {
	switch (status) {
		case 'PENDING':
			return '#FFC300'; // Yellow
		case 'CONFIRMED':
			return '#27AE60'; // Green
		case 'CANCELED':
			return '#C0392B'; // Red
		default:
			return '#54728c'; // Default color for other statuses
	}
}
