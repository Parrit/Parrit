import { IPairingBoard } from "../interfaces/IPairingBoard";
import { IPerson } from "../interfaces/IPerson";

export interface IProject {
  name: string;
  id: number;
  pairingBoards: IPairingBoard[];
  people: IPerson[];
}

export class Project implements IProject {
  name: string;
  id: number;
  pairingBoards: IPairingBoard[];
  people: IPerson[];

  constructor(project: IProject) {
    this.name = `${project.name}`;
    this.id = project.id;
    this.pairingBoards = [...project.pairingBoards];
    this.people = [...project.people];
  }

  get canAPairingBeMade(): boolean {
    const atLeast2Floaters = this.people.length >= 2;
    const atLeast1Floater = this.people.length >= 1;
    const atLeast1EmptyBoard = this.emptyPairingBoard !== undefined;
    const atLeast1UnpairedSticker =
      this.currentUnpairedStickingPeople.length >= 1;
    return (
      (atLeast1Floater && atLeast1UnpairedSticker) ||
      (atLeast2Floaters && atLeast1EmptyBoard)
    );
  }

  get emptyPairingBoard() {
    return this.pairingBoards.find((pb) => pb.people.length === 0);
  }

  get currentUnpairedStickingPeople(): IPerson[] {
    const val: IPerson[] = [];
    return this.pairingBoards.flatMap((board) => {
      if (board.people.length === 1) {
        return board.people;
      } else {
        return [];
      }
    });
  }

  currentPersonPairingBoard(person: IPerson) {
    return this.pairingBoards.find((pb) =>
      pb.people.find((p) => p.id === person.id)
    );
  }

  movePerson(person: IPerson, position?: IPairingBoard) {
    const currentBoard = this.currentPersonPairingBoard(person);
    let proj: Project = this.removePerson(person, this, currentBoard);
    proj = proj.addPerson(person, proj, position);
    return proj;
  }

  removePerson(
    person: IPerson,
    proj: IProject,
    position?: IPairingBoard
  ): Project {
    const copy = new Project(proj);
    const arr: IPerson[] = [];
    if (!position) {
      // we're removing this person from floating
      copy.people.forEach((p) => {
        if (p.id !== person.id) {
          arr.push(p);
        }
      });
      copy.people = arr;
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

    return new Project(copy);
  }

  addPerson(
    person: IPerson,
    proj: IProject,
    position?: IPairingBoard
  ): Project {
    const copy = new Project(proj);
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

    return new Project(copy);
  }
}
