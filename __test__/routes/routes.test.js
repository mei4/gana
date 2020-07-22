const app = require('../../src/app');
const request = require('supertest');

describe('when the route is /', () => {
	test('returns a HTML', () => {
		
		return request(app)
		.get('/')
		.expect(200)
		.expect('Content-Type', 'text/html; charset=UTF-8')
		.then(response => {
			expect(response.text).toContain('<h2>GROCERIES API!</h2>')
		})
	})
})