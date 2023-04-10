// test imports
const { expect } = require('chai');
const mongoose = require('mongoose');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

// to be tested imports
const { postLogin, postSingUp } = require('../controllers/auth');

describe('Auth controller', function () {
	before(async function () {
		await mongoose.connect(
			`mongodb+srv://menumanager:menu123@cluster0.0ofd72s.mongodb.net/menu`,
		);
	});

	it('Should throw an error if user is not registered', async function () {
		const req = {
			body: {
				username: 'test@test.com',
				password: 'test',
			},
		};

		const login = await postLogin(req, {}, (error) => {
			return error;
		});

		expect(login).to.be.an('error');
		expect(login.message).to.be.equal('Login Error - Username');
		expect(login).to.have.property('statusCode', 401);
	});

	it('Should throw an error if user password is incorrect', async function () {
		const req = {
			body: {
				username: 'admin',
				password: 'test',
			},
		};

		const login = await postLogin(req, {}, (error) => {
			return error;
		});

		expect(login).to.be.an('error');
    expect(login.message).to.be.equal('Login Error - Password');
		expect(login).to.have.property('statusCode', 401);
	});

	after(async function () {
		await mongoose.disconnect();
	});

	it('Should send the token if the user and password matches the db', async function () {
		const req = {
			body: {
				username: 'admin',
				password: 'admin',
			},
		};

		sinon.stub(jwt, 'sign');
		jwt.sign.returns('teste');

		const res = {
			statusCode: 500,
			token: undefined,
			status: function (code) {
				this.statusCode = code;
				return this;
			},
			json: function (data) {
				this.token = data.token;
			},
		};

		const login = await postLogin(req, res, () => {});
		expect(res.token).to.be.equal('teste');
		jwt.sign.restore();
	});

	after(async function () {
		await mongoose.disconnect();
	});
});
