const expect = require("chai").expect;
const request = require("supertest");

const server = require("../../../server");
const connection = require("../../../db/index");

describe("POST /auth", () => {
  it("OK, Driver register works", done => {
    request(server)
      .post("/v1/auth/driver/register")
      .send({
        nid: "961881111v",
        password: "123",
        first_name: "sashika",
        last_name: "nawarathne",
        fines: [],
        vehicles: [],
        contact_number: "710502210",
        license_number: "123456789"
      })
      .then(res => {
        const body = res.body;

        expect(body).to.contain.property("message");
        expect(body).to.contain.property("data");

        done();
      })
      .catch(err => done(err));
  });
});
