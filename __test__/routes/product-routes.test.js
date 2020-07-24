require('dotenv').config()
const app = require('../../src/app');
const dbHandler = require('../db-handler');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const Product = require('../../src/models/product-model')

const testToken = jwt.sign({email: 'some-email',}, process.env.JWT_KEY, {expiresIn: "10m"	} );

beforeAll(async () => {
	await dbHandler.connect()
})

beforeEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

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
				expect(response.body).toHaveLength(2)
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
				.set('Authorization', 'Bearer ' + testToken)
				.send(apple)
				.expect(201)
				.then(response => {
					expect(response.body.name).toContain(appleName)
				})
			})
		})
	
		describe('when adding a product with a name that does exist', () => {	
			test('return the new product', () => {
				const apple = new Product( { name: 'test-apple' } );
				dbHandler.addData(apple)

				return request(app)
				.post('/products')
				.set('Authorization', 'Bearer ' + testToken)
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
					expect(response.body.message).toEqual(`Product with id [${productId}] does not exist.`)
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
					expect(response.body.message).toEqual(`ID [${invalidId}] has an invalid format.`)
				})
			})
		})
		
	})

	describe('when PUT is called ', () => {
		describe('when the product is successfully updated', () => {
			test('returns the product updated', () => {
				const cheeseId = '321321321321321321321321'
				const cheeseName = 'test-cheese'
				const cheese = new Product( { _id: cheeseId, name: cheeseName, amount: 9 } );
				dbHandler.addData(cheese)
				
				const newName = 'test-smelly-cheese';

				return request(app)
				.put(`/products/${cheeseId}`)
				.set('Authorization', 'Bearer ' + testToken)
				.send({ name: newName})
				.expect(200)
				.then(response => {
					expect(response.body.name).toEqual(newName)
					expect(response.body.name).not.toEqual(cheeseName)
					expect(response.body.amount).toBe(9)
				})
			})
		})

		describe('when the new product name already exists', () => {
			test('returns an error message', () => {
				const appleName = 'test-apple'
				const cheeseId = '321321321321321321321321'
				const apple = new Product( { name: appleName } );
				const cheese = new Product( { _id: cheeseId, name: 'test-cheese' } );
				dbHandler.addData(apple, cheese)
				
				return request(app)
				.put(`/products/${cheeseId}`)
				.set('Authorization', 'Bearer ' + testToken)
				.send({ name: appleName})
				.expect(409)
			})
		})

		describe('when the product does not exists', () => {
			test('returns an error message', () => {
				const requestId = '321321321321321321321321'
				
				const newName = 'test-smelly-cheese';

				return request(app)
				.put(`/products/${requestId}`)
				.set('Authorization', 'Bearer ' + testToken)
				.send({ name: newName})
				.expect(404)
				.then(response => {
					expect(response.body.message).toEqual(`Product with id [${requestId}] does not exist.`)
				})
			})
		})

		describe('when the id is not valid', () => {
			test('returns an error message', () => {
				const invalidId = '1'
				return request(app)
				.put(`/products/${invalidId}`)
				.set('Authorization', 'Bearer ' + testToken)
				.expect(400)
				.then(response => {
					expect(response.body.message).toEqual(`ID [${invalidId}] has an invalid format.`)
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
				.set('Authorization', 'Bearer ' + testToken)
				.expect(200)
				.then(response => {
					expect(response.body.message).toEqual(`Product [${cheeseName}] was succesfully deleted.`)
				})
			})
		})

		describe('when the product does not exist', () => {	
			test('returns a success message', () => {
				const productId = '321321321321321321321321'
				return request(app)
				.delete(`/products/${productId}`)
				.set('Authorization', 'Bearer ' + testToken)
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
				.delete(`/products/${invalidId}`)
				.set('Authorization', 'Bearer ' + testToken)
				.expect(400)
				.then(response => {
					expect(response.body.message).toEqual(`ID [${invalidId}] has an invalid format.`)
				})
			})
		})
	})
})