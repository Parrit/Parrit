import { Project } from "../../project/classes/Project";
import { IPerson } from "../../project/interfaces/IPerson";
import { IProject } from "../../project/interfaces/IProject";
import { PairingHistoryDTO } from "../../project/interfaces/PairingHistoryDTO";

export function recommendPairs(
  project: IProject,
  history: PairingHistoryDTO[]
) {
  const helper = new ProjectHelper(project, history);
  if (helper.canAPairingBeMade) {
  }
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
    const projectCopy = { ...this.project };
    while (this.canAPairingBeMade) {
      this.iterateMatch();
    }
    return this.project;
  }

  iterateMatch() {
    const floating = this.floatingParrits[0];
    const topPair = this.pairFor(floating);
    if (topPair) {
      const targetPairingBoard = this.project.currentPersonPairingBoard(
        topPair
      );
      if (targetPairingBoard) {
        this.project = new Project(
          this.project.movePerson(floating, targetPairingBoard)
        );
      } else {
        // we know top pair is floating because they have no pairing board
        const emptyPairingBoard = this.emptyPairingBoard();
        if (emptyPairingBoard) {
          let proj = new Project(
            this.project.movePerson(floating, emptyPairingBoard)
          );
          proj = new Project(proj.movePerson(topPair, emptyPairingBoard));
          this.project = proj;
        }
      }
    }
  }

  emptyPairingBoard() {
    return this.project.pairingBoards.find((pb) => pb.people.length === 0);
  }

  pairFor(person: IPerson, nth: number = 0) {
    // 0-indexed number from the last most recent paired
    const allAvailable = [
      ...this.project.people,
      ...this.currentUnpairedStickingPeople,
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

  get canAPairingBeMade(): boolean {
    return (
      this.floatingParrits.length > 0 &&
      this.currentUnpairedStickingPeople.length > 0
    );
  }

  get currentUnpairedStickingPeople(): IPerson[] {
    const val: IPerson[] = [];
    return this.project.pairingBoards.flatMap((board) => {
      if (board.people.length === 1) {
        return board.people;
      } else {
        return [];
      }
    });
  }

  get floatingParrits(): IPerson[] {
    return this.project.people;
  }

  get isCurrentPairingValid(): boolean {
    const unpaired = this.currentUnpairedStickingPeople;
    if (unpaired.length > 0) {
      // If there are any unpaired sticking people
      // it is valid ONLY if there are no floating pairs
      return this.floatingParrits.length === 0;
    } else {
      // If there are NO unpaired sticking people
      // it is valid ONLY if there is at most 1 floating pair
      return this.floatingParrits.length <= 1;
    }
  }
}
