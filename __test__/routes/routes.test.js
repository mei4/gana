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

describe('when the route is /api-docs', () => {
	test('returns a HTML from Swagger UI', () => {
		
		return request(app)
		.get('/api-docs/')
		.expect(200)
		.expect('Content-Type', 'text/html; charset=utf-8')
		.then(response => {
			expect(response.text).toContain('id="swagger-ui')
		})
	})
})