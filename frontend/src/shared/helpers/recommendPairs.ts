import { Project } from "../../project/classes/Project";
import { IPerson } from "../../project/interfaces/IPerson";
import { IProject } from "../../project/interfaces/IProject";
import { PairingHistoryDTO } from "../../project/interfaces/PairingHistoryDTO";

export function recommendPairs(
  project: IProject,
  history: PairingHistoryDTO[]
) {
  const helper = new ProjectHelper(project, history);
  return helper.recommendedConfiguration();
}

class Pair {
  private person1;
  private person2;

  constructor(person1: IPerson, person2: IPerson) {
    // guarantee that this pair will be formed the same no matter the order
    // that the people are input
    const arr = [person1, person2].sort((a, b) => a.id - b.id);
    this.person1 = arr[0];
    this.person2 = arr[1];
  }

  get hashcode() {
    return `${this.person1.id}&&${this.person2.id}`;
  }
}

export class ProjectHelper {
  private project: Project;
  timetable: { [key: string]: Date };

  constructor(project: IProject, history: PairingHistoryDTO[]) {
    this.project = new Project(project);
    this.timetable = {};
    history.forEach((item) => {
      if (item.people.length > 1) {
        for (let i = 0; i < item.people.length; i++) {
          for (let j = i + 1; j < item.people.length; j++) {
            const p1 = item.people[i];
            const p2 = item.people[j];
            const pair = new Pair(p1, p2);
            const hash = pair.hashcode;
            const extant = this.timetable[hash];
            const pairDate = new Date(item.pairingTime);
            if (!extant) {
              this.timetable[hash] = pairDate; // create date from timestamp
            } else {
              if (extant.getTime() < pairDate.getTime()) {
                this.timetable[hash] = pairDate;
              }
            }
          }
        }
      }
    });
  }

  recommendedConfiguration(): IProject {
    let projectCopy = new Project(this.project);
    while (projectCopy.canAPairingBeMade) {
      projectCopy = this.iterateMatch(projectCopy);
    }
    this.project = projectCopy;
    return this.project;
  }

  iterateMatch(project: IProject) {
    const copy = new Project(project);
    const floating = copy.people[0];
    let topPair = this.pairFor(floating, copy);
    for (let i = 0; topPair != undefined; i++) {
      topPair = this.pairFor(floating, copy, i);

      if (topPair) {
        const targetPairingBoard = copy.currentPersonPairingBoard(topPair);
        if (targetPairingBoard) {
          return new Project(copy.movePerson(floating, targetPairingBoard));
        } else {
          // we know top pair is floating because they have no pairing board
          const emptyPairingBoard = copy.emptyPairingBoard;
          if (emptyPairingBoard) {
            let proj = new Project(
              copy.movePerson(floating, emptyPairingBoard)
            );
            proj = new Project(proj.movePerson(topPair, emptyPairingBoard));
            return proj;
          }
          // found 2 unmatched pairs but no empty pairing board
        }
      }
    }

    return copy;
  }

  pairFor(person: IPerson, project: Project = this.project, nth: number = 0) {
    // 0-indexed number from the last most recent paired
    const allAvailable = [
      ...project.people,
      ...project.currentUnpairedStickingPeople,
    ];
    const partnerDates = allAvailable
      .map((p) => {
        if (person.id === p.id) {
          return undefined;
        }
        const hashcode = new Pair(person, p).hashcode;
        return { time: this.timetable[hashcode], partner: p };
      })
      .filter((el) => {
        return el !== undefined;
      })
      .sort((a, b) => {
        if (!a?.time) {
          // this pairing has never occured
          return -1;
        }
        if (!b?.time) {
          // this pairing has never occured
          return 1;
        }
        return a.time.getTime() - b.time.getTime();
      });
    if (partnerDates.length > 0) {
      return partnerDates[nth]?.partner;
    }

    return undefined;
  }
}
