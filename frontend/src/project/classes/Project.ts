import {add, IPairingBoard} from "../interfaces/IPairingBoard";
import {IPerson} from "../interfaces/IPerson";
import {append, assoc, findIndex, Lens, lensIndex, lensProp, map, over, reject} from "ramda";

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

  get emptyPairingBoard(): IPairingBoard | undefined {
    return this.pairingBoards.find(
      (pb) => pb.people.length === 0 && !pb.exempt
    );
  }

  get currentUnpairedStickingPeople(): IPerson[] {
    return this.pairingBoards
        .filter(board => !board.exempt)
        .filter(board => board.people.length === 1)
        .flatMap(board => board.people);
  }

  currentPersonPairingBoard(person: IPerson): IPairingBoard | undefined {
    return this.pairingBoards.find((pb) =>
      pb.people.find((p) => p.id === person.id)
    );
  }

  movePerson(person: IPerson, position?: IPairingBoard): IProject {
    let proj: Project = this.removePerson(person);
    proj = proj.addPerson(person, proj, position);
    return proj;
  }

  removePerson(person: IPerson): Project {
      const boardsLens: Lens<IProject, IPairingBoard[]> = lensProp<IProject, 'pairingBoards'>('pairingBoards');
      return new Project(
          over<IProject, IPairingBoard[]>(boardsLens, map(board => {
              return assoc('people', reject<IPerson>(p => p.id === person.id, board.people), board);
          }), assoc('people', reject<IPerson>(p => p.id === person.id, this.people), this))
      );
  }

  addPerson(
    person: IPerson,
    proj: IProject,
    position?: IPairingBoard
  ): Project {
    if (!position) {
      return new Project(assoc('people', append(person, proj.people), proj));
    } else {
      const targetBoardIndex = findIndex<IPairingBoard>(board => board.id === position.id, proj.pairingBoards);
      const boardsLens: Lens<IPairingBoard[], IPairingBoard> = lensIndex<IPairingBoard>(targetBoardIndex);
      const updatedPairingBoards = over(boardsLens, (board: IPairingBoard) => add(person, board), proj.pairingBoards);

      return new Project(assoc('pairingBoards', updatedPairingBoards, proj));
    }
  }
}
