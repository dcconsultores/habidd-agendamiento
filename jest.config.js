module.exports = {
	testEnvironment: 'jsdom',
	testEnvironmentOptions: {
		customExportConditions: [], // don't load "browser" field
	},
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
	},
};
