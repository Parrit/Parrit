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

  it("constructs the timetable as expected", () => {
    expect(subject.timetable).toEqual({
      "-2&&-1": new Date("2021-01-22T03:02:33.288Z"),
      "-3&&-1": new Date("2021-01-18T03:02:33.288Z"),
      "-3&&-2": new Date("2021-01-17T03:02:33.288Z"),
      "-4&&-1": new Date("2021-01-17T03:02:33.288Z"),
      "-4&&-2": new Date("2021-01-20T03:02:33.288Z"),
      "-4&&-3": new Date("2021-01-19T03:02:33.288Z"),
    });
  });
});
