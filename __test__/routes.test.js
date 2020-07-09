const request = require("supertest");
const app = require("../src/app");
const routes = require("../src/routes");
const dbHandler = require('./db-handler');

beforeAll(async () => {
	await dbHandler.connect()
	routes(app)
})

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('Test GET methods', () => {

	test("It should return 200 for /", () => {
		return request(app)
		.get("/")
		.then(response => {
			expect(response.statusCode).toBe(200);
		});
	});
	
	test("It should return 200 for /products", () => {
		return request(app)
		.get("/products")
		.then(response => {
			console.log('response ' + JSON.stringify(response.body))
			expect(response.statusCode).toBe(200);
		});
  });
})