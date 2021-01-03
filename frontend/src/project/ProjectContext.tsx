import React, { createContext, useState } from "react";
import * as DatabaseHelpers from "../shared/helpers/DatabaseHelpers";

export interface IProjectContext {
  project: IProject;
  people: IPerson[];
  pairingBoards: IPairingBoard[];
  createPerson: (name: string) => Promise<void>;
  createPairingBoard: (name: string) => Promise<void>;
  createRole: (name: string, pairingBoard: IPairingBoard) => Promise<IRole>;
  movePerson: (person: IPerson, position: IPosition) => void;
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

  const movePerson = (person: IPerson, position: IPosition) => {};

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
