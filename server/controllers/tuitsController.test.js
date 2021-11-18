require("dotenv").config();
const Tuit = require("../../database/models/tuit");
const { getTuits, createTuit } = require("./tuitsController");

jest.mock("../../database/models/tuit");

describe("Given an getTuits function", () => {
  describe("When it receives an object request an object response", () => {
    test("Then it should invoke the method json of res with a list of tuits", async () => {
      const tuits = [
        { text: "Woaaaallaaaa", likes: 18, date: "1-2-1003" },
        { text: "Waaaadioooos", likes: 13, date: "1-2-1004" },
      ];

      Tuit.find = jest.fn().mockResolvedValue(tuits);

      const res = {
        json: jest.fn(),
      };

      await getTuits(null, res);

      expect(res.json).toHaveBeenCalledWith(tuits);
    });
  });
});

describe("Given a createTuit function", () => {
  describe("When it receives a request with a Tuit and a response", () => {
    test("Then it should invoke the method .json with the new Tuit", async () => {
      const req = {
        body: {
          text: "Tuit hola",
          date: new Date(),
        },
      };
      const res = {
        json: jest.fn(),
        status: () => {},
      };

      Tuit.create = jest.fn().mockResolvedValue(req.body);

      await createTuit(req, res);

      expect(res.json).toHaveBeenCalledWith(req.body);
    });
  });
});
