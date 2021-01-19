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
  createRole: (name: string, pairingBoard: IPairingBoard) => Promise<void>;
  movePerson: (person: IPerson, position?: IPairingBoard) => void;
  moveRole: (role: IRole, position: IPairingBoard) => void;
  deletePerson: (person: IPerson) => Promise<any>;
  deleteRole: (role: IRole) => Promise<any>;
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

  const removeRole = (
    role: IRole,
    proj: IProject,
    position: IPairingBoard
  ): IProject => {
    const copy = { ...proj };
    const arr: IRole[] = [];
    const board = copy.pairingBoards.find((pb) => pb.id === position.id);
    if (!board) {
      throw new Error("AWK! Totally Broken!");
    }
    const index = copy.pairingBoards.indexOf(board);
    console.log("roles currently on board", position.roles);
    console.log("role to remove", role);
    position.roles.forEach((r) => {
      if (r.id !== role.id) {
        arr.push(r);
      }
    });
    copy.pairingBoards[index] = { ...board, roles: arr };
    console.log("pairing board with removed roles", copy.pairingBoards[index]);

    return copy;
  };

  const addRole = (
    role: IRole,
    proj: IProject,
    position: IPairingBoard
  ): IProject => {
    const copy = { ...proj };
    const board = copy.pairingBoards.find((pb) => pb.id === position.id);
    if (!board) {
      throw new Error("AWK! Totally Broken!");
    }
    const index = copy.pairingBoards.indexOf(board);
    board.roles.push(role);
    copy.pairingBoards[index] = board;
    setProject(copy);

    return copy;
  };

  const createRole = (name: string, pairingBoard: IPairingBoard) => {
    return DatabaseHelpers.postRole(project.id, pairingBoard.id, name).then(
      (project) => {
        setProject(project);
      }
    );
  };

  const moveRole = (role: IRole, position: IPairingBoard) => {
    const currentRoleBoard = currentRolePairingBoard(role);
    if (!currentRoleBoard) {
      throw new Error(
        "AWK! Totally broken, can't move role from a place it doesn't exist"
      );
    }
    let proj = removeRole(role, project, currentRoleBoard);
    proj = addRole(role, proj, position);
    setProject(proj);
    DatabaseHelpers.putRolePosition(
      project.id,
      currentRoleBoard,
      role,
      position
    ).then((updatedProject) => {
      setProject(updatedProject);
    });
  };

  const deleteRole = (role: IRole) => {
    const currentPB = currentRolePairingBoard(role);

    if (currentPB) {
      return DatabaseHelpers.deleteRole(project.id, currentPB, role);
    }

    return Promise.reject(
      new Error(`couldn't find role ${role.name} on any pairing board`)
    );
  };

  const currentRolePairingBoard = (role: IRole) =>
    pairingBoards.find((pb) => pb.roles.find((r) => r.id === role.id));

  const currentPersonPairingBoard = (person: IPerson) =>
    pairingBoards.find((pb) => pb.people.find((p) => p.id === person.id));

  const removePerson = (
    person: IPerson,
    proj: IProject,
    position?: IPairingBoard
  ): IProject => {
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
      setProject(copy);
    }

    return copy;
  };

  const movePerson = (person: IPerson, position?: IPairingBoard) => {
    let proj = removePerson(person, project, currentPersonPairingBoard(person));
    proj = addPerson(person, proj, position);
    setProject(proj);
    DatabaseHelpers.putPersonPosition(project.id, person, position).then(
      (updatedProject) => {
        setProject(updatedProject);
      }
    );
  };

  const deletePerson = (person: IPerson) => {
    const updatedProject = removePerson(
      person,
      project,
      currentPersonPairingBoard(person)
    );
    setProject(updatedProject);
    return DatabaseHelpers.deletePerson(project.id, person.id).then((proj) =>
      setProject(proj)
    );
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
    moveRole,
    deletePerson,
    deleteRole,
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
