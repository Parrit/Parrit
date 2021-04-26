import { PairingHistoryDTO } from "../../project/interfaces/PairingHistoryDTO";
import { ProjectHelper } from "./recommendPairs";
import { DefaultObjects } from ".";
import { Project } from "../../project/classes/Project";

describe("recommending pairs", () => {
  let subject: ProjectHelper;
  let project: Project;
  let history: PairingHistoryDTO[];

  beforeEach(() => {
    project = new Project(DefaultObjects.project());
    history = DefaultObjects.history();
    subject = new ProjectHelper(project, history);
  });

  it("returns solo people on non-exempt pairing boards", () => {
    expect(project.unpairedStickingPeople).toEqual([
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
      expect(subject.pairFor(DefaultObjects.person1()).id).toEqual(6);
      expect(subject.pairFor(DefaultObjects.person2()).id).toEqual(6);
      expect(subject.pairFor(DefaultObjects.person3()).id).toEqual(6);
      expect(subject.pairFor(DefaultObjects.person4()).id).toEqual(6);
      expect(subject.pairFor(DefaultObjects.person5()).id).toEqual(3);
      expect(subject.pairFor(DefaultObjects.person6()).id).toEqual(3);
    });

    it("returns the nth-most recent pair", () => {
      expect(subject.pairFor(DefaultObjects.person1(), project, 1).id).toEqual(
        5
      );
      expect(subject.pairFor(DefaultObjects.person2(), project, 1).id).toEqual(
        5
      );
      expect(subject.pairFor(DefaultObjects.person3(), project, 1).id).toEqual(
        5
      );
      expect(subject.pairFor(DefaultObjects.person4(), project, 1).id).toEqual(
        5
      );
      expect(subject.pairFor(DefaultObjects.person5(), project, 1).id).toEqual(
        1
      );
      expect(subject.pairFor(DefaultObjects.person6(), project, 1).id).toEqual(
        1
      );
    });
  });

  describe("empty pairing board", () => {
    it("does not include exempt boards", () => {
      expect(new Project(project).emptyPairingBoard).toEqual({
        exempt: false,
        id: 4,
        name: "Truffle-hunter",
        people: [],
        roles: [],
      });
    });
  });

  it("looks like the expected structure initially", () => {
    expect(project.pairingBoards[0]).toEqual({
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
    });
    expect(project.pairingBoards[1]).toEqual({
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
    });
    expect(project.pairingBoards[2]).toEqual({
      exempt: true,
      id: 3,
      name: "Out of Office",
      people: [
        {
          id: 7,
          name: "Sylvia",
        },
      ],
      roles: [],
    });
    expect(project.pairingBoards[3]).toEqual({
      exempt: false,
      id: 4,
      name: "Truffle-hunter",
      people: [],
      roles: [],
    });
    expect(project.people).toEqual([
      {
        id: 2,
        name: "Hanchen",
      },
      {
        id: 4,
        name: "Darcie",
      },
      {
        id: 5,
        name: "Joe",
      },
      {
        id: 6,
        name: "Michael",
      },
    ]);
  });

  describe("iterateMatch", () => {
    let firstIteration: Project;

    it("should be able to make a match initially", () => {
      expect(project.canAPairingBeMade).toBe(true);
    });

    describe("the first iteration", () => {
      beforeEach(() => {
        firstIteration = subject.iterateMatch(project);
      });

      it("can make another iteration", () => {
        expect(firstIteration.canAPairingBeMade).toEqual(true);
      });

      it("makes the iteration", () => {
        expect(firstIteration.pairingBoards[0]).toEqual({
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
        });
        expect(firstIteration.pairingBoards[1]).toEqual({
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
        });
        expect(firstIteration.pairingBoards[2]).toEqual({
          exempt: true,
          id: 3,
          name: "Out of Office",
          people: [
            {
              id: 7,
              name: "Sylvia",
            },
          ],
          roles: [],
        });
        expect(firstIteration.pairingBoards[3]).toEqual({
          exempt: false,
          id: 4,
          name: "Truffle-hunter",
          people: [
            {
              id: 2,
              name: "Hanchen",
            },
            {
              id: 6,
              name: "Michael",
            },
          ],
          roles: [],
        });
        expect(firstIteration.people).toEqual([
          {
            id: 4,
            name: "Darcie",
          },
          {
            id: 5,
            name: "Joe",
          },
        ]);
      });

      describe("the second iteration", () => {
        let secondIteration: Project;
        beforeEach(() => {
          secondIteration = subject.iterateMatch(firstIteration);
        });

        it("makes the iteration", () => {
          expect(secondIteration).not.toEqual(firstIteration);
          expect(secondIteration.pairingBoards[0]).toEqual({
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
          });
          expect(secondIteration.pairingBoards[1]).toEqual({
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
          });
          expect(secondIteration.pairingBoards[2]).toEqual({
            exempt: true,
            id: 3,
            name: "Out of Office",
            people: [
              {
                id: 7,
                name: "Sylvia",
              },
            ],
            roles: [],
          });
          expect(secondIteration.pairingBoards[3]).toEqual({
            exempt: false,
            id: 4,
            name: "Truffle-hunter",
            people: [
              {
                id: 2,
                name: "Hanchen",
              },
              {
                id: 6,
                name: "Michael",
              },
            ],
            roles: [],
          });
          expect(secondIteration.people).toEqual([
            {
              id: 5,
              name: "Joe",
            },
          ]);
        });
      });
    });
  });

  describe("resulting project", () => {
    it("returns a project of the expected shape", () => {
      const result = subject.recommendedConfiguration();
      expect(result.pairingBoards[0]).toEqual({
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
      });
      expect(result.pairingBoards[1]).toEqual({
        exempt: false,
        id: 2,
        name: "Trubador",
        people: [
          {
            id: 3,
            name: "Cat",
          },
          {
            id: 5,
            name: "Joe",
          },
        ],
        roles: [],
      });
      expect(result.pairingBoards[2]).toEqual({
        exempt: true,
        id: 3,
        name: "Out of Office",
        people: [
          {
            id: 7,
            name: "Sylvia",
          },
        ],
        roles: [],
      });
      expect(result.pairingBoards[3]).toEqual({
        exempt: false,
        id: 4,
        name: "Truffle-hunter",
        people: [
          {
            id: 2,
            name: "Hanchen",
          },
          {
            id: 6,
            name: "Michael",
          },
        ],
        roles: [],
      });
      expect(result.people).toEqual([]);
    });
  });
});
