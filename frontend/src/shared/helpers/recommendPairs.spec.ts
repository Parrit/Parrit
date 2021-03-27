import { IProject } from "../../project/interfaces/IProject";
import { PairingHistoryDTO } from "../../project/interfaces/PairingHistoryDTO";
import { ProjectHelper } from "./recommendPairs";
import { DefaultObjects } from ".";

describe("building the timetable", () => {
  let subject: ProjectHelper;
  let project: IProject;
  let history: PairingHistoryDTO[];

  beforeEach(() => {
    project = DefaultObjects.project();
    history = DefaultObjects.history();
    subject = new ProjectHelper(project, history);
  });

  it("returns solo people on pairing boards", () => {
    expect(subject.currentUnpairedStickingPeople).toEqual([
      {
        id: 1,
        name: "Anthony",
      },
      {
        id: 3,
        name: "Cat",
      },
    ]);
  });

  it("constructs the timetable as expected", () => {
    expect(subject.timetable).toEqual({
      "1&&2": new Date("2021-01-22T03:02:33.288Z"),
      "1&&3": new Date("2021-01-18T03:02:33.288Z"),
      "2&&3": new Date("2021-01-17T03:02:33.288Z"),
      "1&&4": new Date("2021-01-17T03:02:33.288Z"),
      "2&&4": new Date("2021-01-20T03:02:33.288Z"),
      "3&&4": new Date("2021-01-19T03:02:33.288Z"),
    });
  });

  describe("returning the recent pairs for a person", () => {
    it("returns the least recent available pair for passed in person", () => {
      expect(subject.pairFor(DefaultObjects.person1()).id).toEqual(3);
      expect(subject.pairFor(DefaultObjects.person2()).id).toEqual(3);
      expect(subject.pairFor(DefaultObjects.person3()).id).toEqual(2);
      expect(subject.pairFor(DefaultObjects.person4()).id).toEqual(1);
    });

    it("returns the nth-most recent pair", () => {
      expect(subject.pairFor(DefaultObjects.person1(), 1).id).toEqual(2);
      expect(subject.pairFor(DefaultObjects.person2(), 1).id).toEqual(1);
      expect(subject.pairFor(DefaultObjects.person3(), 1).id).toEqual(1);
      expect(subject.pairFor(DefaultObjects.person4(), 1).id).toEqual(3);
    });
  });

  describe("resulting project", () => {
    it("starts out in an expected shape", () => {
      expect(project).toEqual({
        id: 1,
        name: "Test",
        pairingBoards: [
          {
            exempt: false,
            id: 1,
            name: "Cockatiel",
            people: [
              {
                id: 1,
                name: "Anthony",
              },
            ],
            roles: [
              {
                id: 1,
                name: "The only one",
              },
            ],
          },
          {
            exempt: false,
            id: 2,
            name: "Trubador",
            people: [
              {
                id: 3,
                name: "Cat",
              },
            ],
            roles: [],
          },
        ],
        people: [
          {
            id: 2,
            name: "Hanchen",
          },
          {
            id: 4,
            name: "Darcie",
          },
        ],
      });
    });
    it("returns a project of the expected shape", () => {
      expect(subject.recommendedConfiguration()).toEqual({
        project: {
          id: 1,
          name: "Test",
          pairingBoards: [
            {
              exempt: false,
              id: 1,
              name: "Cockatiel",
              people: [
                {
                  id: 1,
                  name: "Anthony",
                },
                {
                  id: 4,
                  name: "Darcie",
                },
              ],
              roles: [
                {
                  id: 1,
                  name: "The only one",
                },
              ],
            },
            {
              exempt: false,
              id: 2,
              name: "Trubador",
              people: [
                {
                  id: 3,
                  name: "Cat",
                },
                {
                  id: 2,
                  name: "Hanchen",
                },
              ],
              roles: [],
            },
          ],
          people: [],
        },
      });
    });
  });
});
