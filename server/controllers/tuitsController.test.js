require("dotenv").config();
const Tuit = require("../../database/models/tuit");
const { getTuits, createTuit, deleteTuit } = require("./tuitsController");

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

describe("Given a deleteTuit function", () => {
  describe("When it receives an req object with and id 2, a res object and a next function", () => {
    test("Then it should invoke the method json with the tuit and the method Tuit.findByIdAndDelete with the id 2, ", async () => {
      const tuit = {
        id: 2,
        text: "Hola",
        date: "",
        likes: 5,
      };

      const req = {
        params: {
          id: 2,
        },
      };

      const res = {
        json: jest.fn(),
        status: () => {},
      };

      const next = jest.fn();

      Tuit.findByIdAndDelete = jest.fn().mockResolvedValue(tuit);

      await deleteTuit(req, res, next);

      expect(Tuit.findByIdAndDelete).toHaveBeenCalledWith(tuit.id);
      expect(res.json).toHaveBeenCalledWith(tuit);
    });

    describe("When its method Tuit.findByIdAndDelete is rejected", () => {
      test("Then it should invoke next function with the error rejected", async () => {
        const error = {};
        Tuit.findByIdAndDelete = jest.fn().mockRejectedValue(error);
        const req = {
          params: {
            id: 0,
          },
        };
        const res = {
          json: () => {},
        };
        const next = jest.fn();

        await deleteTuit(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
