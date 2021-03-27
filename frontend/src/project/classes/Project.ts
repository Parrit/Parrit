import { IPairingBoard } from "../interfaces/IPairingBoard";
import { IPerson } from "../interfaces/IPerson";

export interface IProject {
  name: string;
  id: number;
  pairingBoards: IPairingBoard[];
  people: IPerson[];
}

export class Project implements IProject {
  private project: IProject;

  get name() {
    return this.project.name;
  }

  get id() {
    return this.project.id;
  }

  get pairingBoards() {
    return this.project.pairingBoards;
  }

  get people() {
    return this.project.people;
  }

  constructor(project: IProject) {
    this.project = project;
  }

  currentPersonPairingBoard(person: IPerson) {
    return this.pairingBoards.find((pb) =>
      pb.people.find((p) => p.id === person.id)
    );
  }

  movePerson(person: IPerson, position?: IPairingBoard) {
    let proj = this.removePerson(
      person,
      this.project,
      this.currentPersonPairingBoard(person)
    );
    proj = this.addPerson(person, proj, position);
    return proj;
  }

  removePerson(
    person: IPerson,
    proj: IProject,
    position?: IPairingBoard
  ): IProject {
    const copy = { ...proj };
    const arr: IPerson[] = [];
    if (!position) {
      // we're removing this person from floating
      copy.people.forEach((p) => {
        if (p.id !== person.id) {
          arr.push(p);
          copy.people = arr;
        }
      });
    } else {
      const board = copy.pairingBoards.find((pb) => pb.id === position.id);
      if (!board) {
        throw new Error("AWK! Totally Broken!");
      }
      const index = copy.pairingBoards.indexOf(board);
      position.people.forEach((p) => {
        if (p.id !== person.id) {
          arr.push(p);
        }
      });
      copy.pairingBoards[index] = { ...board, people: arr };
    }

    return copy;
  }

  addPerson(
    person: IPerson,
    proj: IProject,
    position?: IPairingBoard
  ): IProject {
    const copy = { ...proj };
    if (!position) {
      // we're adding this person to floating
      copy.people.push(person);
    } else {
      const board = copy.pairingBoards.find((pb) => pb.id === position.id);
      if (!board) {
        throw new Error("AWK! Totally Broken!");
      }
      const index = copy.pairingBoards.indexOf(board);
      board.people.push(person);
      copy.pairingBoards[index] = board;
    }

    return copy;
  }
}
