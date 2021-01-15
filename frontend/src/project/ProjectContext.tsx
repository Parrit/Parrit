import React, { createContext, useState } from "react";
import * as DatabaseHelpers from "../shared/helpers/DatabaseHelpers";
import { IPairingBoard } from "./interfaces/IPairingBoard";
import { IPerson } from "./interfaces/IPerson";
import { IProject } from "./interfaces/IProject";

export interface IProjectContext {
  project: IProject;
  people: IPerson[];
  pairingBoards: IPairingBoard[];
  createPerson: (name: string) => Promise<void>;
  createPairingBoard: (name: string) => Promise<void>;
  createRole: (name: string, pairingBoard: IPairingBoard) => Promise<IRole>;
  movePerson: (person: IPerson, position: IPairingBoard) => void;
  deletePerson: (person: IPerson) => Promise<any>;
  deletePairingBoard: (pairingBoard: IPairingBoard) => Promise<any>;
  resetPairs: VoidFunction;
  getRecommendedPairs: VoidFunction;
  savePairing: VoidFunction;
  projectId: number;
}

export const ProjectContext = createContext({} as IProjectContext);

interface Props {
  project: IProject;
}

export const ProjectProvider: React.FC<Props> = (props) => {
  const [project, setProject] = useState(props.project);

  const people = project.people;
  const pairingBoards = project.pairingBoards;

  const createPerson = (name: string) => {
    return DatabaseHelpers.postPerson(project.id, name).then(
      (updatedProject) => {
        setProject(updatedProject);
      }
    );
  };

  const createPairingBoard = (name: string) => {
    return DatabaseHelpers.postPairingBoard(project.id, name).then(
      (updatedProject) => {
        setProject(updatedProject);
      }
    );
  };

  const deletePairingBoard = (pairingBoard: IPairingBoard) => {
    return DatabaseHelpers.deletePairingBoard(project.id, pairingBoard.id);
  };

  const createRole = (name: string, pairingBoard: IPairingBoard) => {
    return DatabaseHelpers.postRole(project.id, pairingBoard.id, name).then(
      (role) => {
        return role;
      }
    );
  };

  const currentPairingBoard = (person: IPerson) =>
    pairingBoards.find((pb) => pb.people.find((p) => p.id === person.id));

  const removePerson = (
    person: IPerson,
    proj: IProject,
    position?: IPairingBoard
  ): IProject => {
    console.log(`remove person ${person.name} from ${position}`);
    const copy = { ...proj };
    const arr: IPerson[] = [];
    if (!position) {
      console.log("remove from floating");
      // we're removing this person from floating
      copy.people.forEach((p) => {
        if (p.id !== person.id) {
          arr.push(p);
          copy.people = arr;
          console.log(
            "setting top level people array",
            arr.map((p) => p.name)
          );
          console.log("setting project", copy);
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
      console.log("removePerson - setting project", copy);
    }

    return copy;
  };

  const addPerson = (
    person: IPerson,
    proj: IProject,
    position?: IPairingBoard
  ): IProject => {
    const copy = { ...proj };
    if (!position) {
      // we're adding this person to floating
      copy.people.push(person);
      setProject(copy);
    } else {
      const board = copy.pairingBoards.find((pb) => pb.id === position.id);
      if (!board) {
        throw new Error("AWK! Totally Broken!");
      }
      const index = copy.pairingBoards.indexOf(board);
      board.people.push(person);
      copy.pairingBoards[index] = board;
      console.log("addPerson - setting project", copy);
      setProject(copy);
    }

    return copy;
  };

  const movePerson = (person: IPerson, position?: IPairingBoard) => {
    console.log("moving person", person);
    console.log("to position", position);
    let proj = removePerson(person, project, currentPairingBoard(person));
    proj = addPerson(person, proj, position);
    setProject(proj);
    DatabaseHelpers.putPersonPosition(project.id, person, position).then(
      (updatedProject) => {
        setProject(updatedProject);
      }
    );
  };

  const deletePerson = (person: IPerson) => {
    return DatabaseHelpers.deletePerson(project.id, person.id);
  };
  const resetPairs = () => {};

  const getRecommendedPairs = () => {};

  const savePairing = () => {};

  const value = {
    createPerson,
    createPairingBoard,
    deletePairingBoard,
    createRole,
    movePerson,
    deletePerson,
    resetPairs,
    getRecommendedPairs,
    savePairing,
    project,
    people,
    pairingBoards,
    projectId: project.id,
  };

  return (
    <ProjectContext.Provider value={value}>
      {props.children}
    </ProjectContext.Provider>
  );
};
