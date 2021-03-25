import { Hash } from "crypto";
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
  private project;
  private history;
  timetable: { [key: string]: Date };

  constructor(project: IProject, history: PairingHistoryDTO[]) {
    this.project = project;
    this.history = history;
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
