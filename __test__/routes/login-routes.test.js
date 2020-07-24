require('dotenv').config()
const app = require('../../src/app');
const bcrypt = require('bcrypt')
const dbHandler = require('../db-handler');
const jwt = require('jsonwebtoken');
const request = require('supertest');
const User = require('../../src/models/user-model')

beforeAll(async () => {
	await dbHandler.connect()
})

beforeEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('when the route is /login', () => {
	describe('when the username and password are valid', () => {
		test('retuns a token', async() => {
			const username = 'some-username'
			const password = 'some-password'
			const expectedToken = jwt.sign({username: username, password: password}, process.env.JWT_KEY, {expiresIn: "30m"	} );

			const userWithEncryptedPassword = new User( { username: username, password: bcrypt.hashSync(password, 10) } );
			dbHandler.addData(userWithEncryptedPassword)
			const user = new User( { username: username, password: password });

			return request(app)
			.get('/login')
			.send(user)
			.expect(200)
			.then(response => {
				expect(response.body).toEqual(expectedToken)
			})
		})
	})

	describe('when the username does not exist', () => {
		test('retuns an unauthorized error', () => {
			const username = 'not-valid-username'
			const password = 'some-password'
		
			const user = new User( { username: username, password: password } );

			return request(app)
			.get('/login')
			.send(user)
			.expect(404)
			.then(response => {
				expect(response.body.message).toEqual('Authentication failed')
			})
		})
	})

	describe('when the password is not valid', () => {
		test('retuns an unauthorized error', () => {
			const username = 'valid-username'
			const invalidPassword = 'invalid-password'
			const validPassword = 'valid-password'

			const validUser = new User( { username: username, password: bcrypt.hashSync(validPassword, 10) });
			dbHandler.addData(validUser)
			const invalidUser = new User( { username: username, password: invalidPassword } );

			return request(app)
			.get('/login')
			.send(invalidUser)
			.expect(404)
			.then(response => {
				expect(response.body.message).toEqual('Authentication failed')
			})
		})
	})
})