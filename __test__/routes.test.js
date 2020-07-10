const request = require('supertest');
const dbHandler = require('./db-handler');
const app = require('../src/app');
const routes = require('../src/routes');
const Product = require('../src/product/productModel')

beforeAll(async () => {
	await dbHandler.connect()
	routes(app)
})

beforeEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

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

describe('when the route is /products', () => {
	
	describe('when GET is called', () => {
		test("returns all the products without version", () => {
			const appleName = 'test-apple'
			const cheeseName = 'test-cheese'
			const apple = new Product( { name: appleName } );
			const cheese = new Product( { name: cheeseName } );
			dbHandler.addData(apple, cheese)	

			return request(app)
			.get('/products')
			.expect(200)
			.then(response => {
				const bodyAsJson = JSON.stringify(response.body)
				expect(bodyAsJson).toContain(appleName)
				expect(bodyAsJson).toContain(cheeseName)
				expect(bodyAsJson).not.toContain('__v')
			})
		})
	})

	describe('when POST is called', () => {
				
			describe('when adding a product with a name that does NOT exist', () => {	
				test('returns the new product', () => {
					const appleName = 'test-apple'
					const apple = new Product( { name: appleName } );
	
					return request(app)
					.post('/products')
					.send(apple)
					.expect(201)
					.then(response => {
						const bodyAsJson = JSON.stringify(response.body)
						expect(bodyAsJson).toContain(appleName)
					})
				})
			})
	
			describe('when adding a product with a name that does exist', () => {	
				test('return the new product', () => {
					const apple = new Product( { name: 'test-apple' } );
					dbHandler.addData(apple)
	
					return request(app)
					.post('/products')
					.send(apple)
					.expect(409)
				})
			})
	})
})

describe('when the route is /products/:id', () => {
	describe('when GET is called', () => {
		describe('when the product exists', () => {
			test('returns the product', () => {
				const cheeseId = '321321321321321321321321'
				const cheeseName = 'test-cheese'
				const appleName = 'test-apple'
				const apple = new Product( { _id: "123123123123123123123123", name: appleName } );
				const cheese = new Product( { _id: cheeseId, name: cheeseName } );
				dbHandler.addData(apple, cheese)	
	
				return request(app)
				.get(`/products/${cheeseId}`)
				.expect(200)
				.then(response => {
					const bodyAsJson = JSON.stringify(response.body)
					expect(bodyAsJson).not.toContain(appleName)
					expect(bodyAsJson).toContain(cheeseName)
				})
			})
		})

		describe('when the product does NOT exists', () => {
			test('returns an error message', () => {
				const productId = '321321321321321321321321'
				return request(app)
				.get(`/products/${productId}`)
				.expect(404)
				.then(response => {
					expect(response.body).toEqual({'message' : `Product with id [${productId}] does not exist.`})
				})
			})
		})

		describe('when the id is not valid', () => {
			test('returns an error message', () => {
				const invalidId = '1'
				return request(app)
				.get(`/products/${invalidId}`)
				.expect(400)
				.then(response => {
					expect(response.body).toEqual({'message' : `ID [${invalidId}] has an invalid format.`})
				})
			})
		})
		
	})

	describe('when DELETE is called', () => {
		
		describe('when the product is succesfully deleted', () => {	
			test('returns a success message', () => {
				const cheeseId = '321321321321321321321321'
				const cheeseName = 'test-cheese'
				const cheese = new Product( { _id: cheeseId, name: cheeseName } );
				dbHandler.addData(cheese)	

				return request(app)
				.delete(`/products/${cheeseId}`)
				.expect(200)
				.then(response => {
					expect(response.body).toEqual({'message' : `Product [${cheeseName}] was succesfully deleted.`})
				})
			})
		})

		describe('when the product does not exist', () => {	
			test('returns a success message', () => {
				const productId = '321321321321321321321321'
				return request(app)
				.delete(`/products/${productId}`)
				.expect(200)
				.then(response => {
					expect(response.body).toEqual({'message' : `Product with id [${productId}] does not exist.`})
				})
			})
		})
	})
})