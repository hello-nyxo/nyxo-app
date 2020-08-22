// jest.mock('chroma-js', () => ({
// 	default: () => {},
// }));

// jest.mock('chroma-js', () => ({
// 	addEventListener: jest.fn(),
// 	removeEventListener: jest.fn(),
// 	requestPermissions: jest.fn(),
// 	default: jest.fn(),
// 	hex: jest.fn(),
// 	alpha: jest.fn(),
// }));

// @ts-ignore
const chroma = require('chroma-js').default

module.exports = chroma
