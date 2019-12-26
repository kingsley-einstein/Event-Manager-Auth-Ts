import { expect } from "chai";
import supertest from "supertest";
import db from "../db";
import app from "..";

const { sequelize } = db;
const root: string = "/api/v1";
let token: string = null;

describe("TESTS", () => {
  before((done) => {
    sequelize.sync({}).then(() => {
      done();
    });
  });
  describe("Auth tests", () => {
    it("should create a user", (done) => {
      supertest(app)
        .post(`${root}/auth`)
        .send({ email: "user@app.com", password: "password" })
        .end((err, res) => {
          const { body, status } = res;
          console.table([body.body]);
          expect(status).to.be.eql(201);
          expect(body.body).to.have.keys("id", "email", "token");
          done(err);
        });
    });
    it("should respond with a 400 if email is already in use", (done) => {
      supertest(app)
        .post(`${root}/auth`)
        .send({ email: "user@app.com", password: "password" })
        .end((err, res) => {
          const { body, status } = res;
          console.table([body]);
          expect(status).to.be.eql(400);
          done(err);
        });
    });
    it("should log user in", (done) => {
      supertest(app)
        .post(`${root}/auth/login`)
        .send({ email: "user@app.com", password: "password" })
        .end((err, res) => {
          const { body, status } = res;
          console.table([body.body]);
          token = body.body.token;
          expect(status).to.be.eql(200);
          done(err);
        });
    });
    it("should get authenticated user", (done) => {
      supertest(app)
        .get(`${root}/auth`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          const { body, status } = res;
          console.table([body.body]);
          expect(status).to.be.eql(200);
          done(err);
        });
    });
  });
});
