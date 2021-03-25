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

  it("constructs the timetible as expected", () => {
    expect(subject.timetable).toEqual({});
  });
});
