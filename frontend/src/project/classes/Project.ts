import {add, IPairingBoard} from "../interfaces/IPairingBoard";
import {IPerson} from "../interfaces/IPerson";
import {append, assoc, findIndex, Lens, lensIndex, lensProp, map, over, propEq, reject, when} from "ramda";

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
      this.unpairedStickingPeople.length >= 1;
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

  get unpairedStickingPeople(): IPerson[] {
    return this.pairingBoards
        .filter(board => !board.exempt)
        .filter(board => board.people.length === 1)
        .flatMap(board => board.people);
  }

  findPairingBoardByPerson(person: IPerson): IPairingBoard | undefined {
    return this.pairingBoards.find((pb) =>
      pb.people.find((p) => p.id === person.id)
    );
  }

  movePerson(person: IPerson, position?: IPairingBoard): IProject {
    const updatedProject = removePerson(person, this);
    return addPerson(person, updatedProject, position);
  }
}

export function addPerson(
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

export function removePerson(person: IPerson, project: IProject): Project {
  const boardsLens: Lens<IProject, IPairingBoard[]> = lensProp<IProject, 'pairingBoards'>('pairingBoards');
  return new Project(
      over<IProject, IPairingBoard[]>(boardsLens, map(board => {
        return assoc('people', reject<IPerson>(p => p.id === person.id, board.people), board);
      }), assoc('people', reject<IPerson>(p => p.id === person.id, project.people), project))
  );
}

export function renamePairingBoard(name: string, pairingBoardId: number, project: IProject): IProject {
  const updatedPairingBoards = updateFieldById('name', name, pairingBoardId, project.pairingBoards);
  return assoc('pairingBoards', updatedPairingBoards, project);
}

function updateFieldById(field: string, value: string, key: number, items: any[]): any[] {
  return map(when(propEq('id', key), assoc(field, value)), items)
}