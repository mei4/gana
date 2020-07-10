const request = require("supertest");
const app = require("../src/app");
const routes = require("../src/routes");
const dbHandler = require('./db-handler');
const Product = require('../src/product/productModel')
const assert = require('assert')

beforeAll(async () => {
	await dbHandler.connect()
	routes(app)
})

beforeEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('when a GET method is called', () => {

	describe('when the route is /', () => {
		
		describe('when status code is 200', () => {	
			test("it should return a HTML", () => {
				return request(app)
				.get("/")
				.expect(200)
				.expect('Content-Type', 'text/html; charset=UTF-8')
				.then(response => {
					expect(response.text).toContain('<h2>GROCERIES API!</h2>')
				})
			})
		})

	})

	describe('when the route is /products', () => {
		
		describe('when status code is 200', () => {	
			test("it should return all the products", () => {
				const apple = new Product( { name: 'test-apple' } );
				const cheese = new Product( { name: 'test-cheese' } );
				dbHandler.addData(apple, cheese)	

				return request(app)
				.get("/products")
				.expect(200)
				.then(response => {
					const bodyAsJson = JSON.stringify(response.body)
					expect(bodyAsJson).toContain('test-apple')
					expect(bodyAsJson).toContain('test-cheese')
				})
			})
		})

	})

	describe('when the route is /products/:id', () => {

		describe('when status code is 200', () => {	
			test("it should return the product", () => {
				const apple = new Product( { _id: "123123123123123123123123", name: 'test-apple' } );
				const cheese = new Product( { _id: "321321321321321321321321", name: 'test-cheese' } );
				dbHandler.addData(apple, cheese)	

				return request(app)
				.get("/products/321321321321321321321321")
				.expect(200)
				.then(response => {
					const bodyAsJson = JSON.stringify(response.body)
					expect(bodyAsJson).not.toContain('test-apple')
					expect(bodyAsJson).toContain('test-cheese')
				})
			})
		})

	})
})