import { expect } from "chai";
import supertest from "supertest";
import db from "../db";
import app from "..";

const { sequelize } = db;
const root: string = "/api/v1";

describe("TESTS", () => {
  before((done) => {
    sequelize.sync({}).then(() => {
      done();
    });
  });
  describe("POST", () => {
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
  });
});
