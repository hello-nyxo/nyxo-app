// jest.mock('i18n-js', () => ({
// 	I18n: {
// 		locale: {},
// 		fallbacks: true,
// 		translations: {},
// 		currentLocale: () => {},
// 	},
// }));

// jest.mock('i18n-js', () => ({
// 	currentLocale: jest.fn(() => 'en'),
// }));

const I18n = require('i18n-js')

jest.genMockFromModule('i18n-js')
module.exports = I18n
