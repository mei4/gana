const request = require("supertest");
const app = require("../src/app");
const routes = require("../src/routes");
const dbHandler = require('./db-handler');
const Product = require('../src/product/productModel')

beforeAll(async () => {
	await dbHandler.connect()
	routes(app)
})

beforeEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('when a GET method is called', () => {

	describe('when the route is /', () => {

		test("it should return a 200", () => {
			return request(app)
			.get("/")
			.then(response => {
				expect(response.statusCode).toBe(200);
			});
		});
	})

	describe('when the route is /products', () => {
		test("it should return all the products", () => {
			const apple = new Product( { name: 'test-apple' } );
			const cheese = new Product( { name: 'test-cheese' } );
			
			dbHandler.addData(apple, cheese)	

			return request(app)
			.get("/products")
			.then(response => {
				expect(response.statusCode).toBe(200);
				expect(JSON.stringify(response.body)).toContain('test-apple')
				expect(JSON.stringify(response.body)).toContain('test-cheese')
			});
			
		});
	})
})