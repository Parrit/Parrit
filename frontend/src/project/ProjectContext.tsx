import React, {createContext, useContext, useEffect, useState} from "react";
import {ApiContext} from "../shared/helpers/ApiContext";
import {recommendPairs} from "../shared/helpers/recommendPairs";
import {Project} from "./classes/Project";
import {AppContext} from "./components/App";
import {IPairingBoard} from "./interfaces/IPairingBoard";
import {IPerson} from "./interfaces/IPerson";
import {IProject} from "./interfaces/IProject";
import {PairingArrangementDTO} from "./interfaces/PairingArrangementDTO";

export interface IProjectContext {
  project: IProject;
  people: IPerson[];
  pairingHistory: PairingArrangementDTO[];
  createPerson: (name: string) => Promise<void>;
  createPairingBoard: (name: string) => Promise<void>;
  createRole: (name: string, pairingBoard: IPairingBoard) => Promise<void>;
  movePerson: (person: IPerson, position?: IPairingBoard) => void;
  moveRole: (role: IRole, position: IPairingBoard) => void;
  destroyPerson: (person: IPerson) => Promise<any>;
  destroyRole: (role: IRole) => Promise<any>;
  destroyPairingBoard: (pairingBoard: IPairingBoard) => Promise<any>;
  resetPairs: () => void;
  getRecommendedPairs: () => void;
  savePairing: () => void;
  projectId: number;
}

export const ProjectContext = createContext({} as IProjectContext);

interface Props {
  project: IProject;
}

export const ProjectProvider: React.FC<Props> = (props) => {
  const { setSystemAlert } = useContext(AppContext);
  const [project, setProject] = useState(props.project);
  const [pairingArrangements, setPairingArrangements] = useState<PairingArrangementDTO[]>([]);
  const {
    getPairingHistory,
    postPerson,
    postPairingBoard,
    deletePairingBoard,
    postRole,
    putRolePosition,
    deleteRole,
    deletePerson,
    postProjectPairing,
    updateProject,
  } = useContext(ApiContext);

  const people = project.people;
  const pairingBoards = project.pairingBoards;

  useEffect(() => {
    getPairingHistory(project.id).then((history) => {
      setPairingArrangements(history);
    });
    //run only once
  }, []);

  const createPerson = (name: string) => {
    return postPerson(project.id, name).then((updatedProject) => {
      setProject(updatedProject);
    });
  };

  const createPairingBoard = (name: string) => {
    return postPairingBoard(project.id, name).then((updatedProject) => {
      setProject(updatedProject);
    });
  };

  const destroyPairingBoard = (pairingBoard: IPairingBoard) => {
    const arr: IPairingBoard[] = [];
    const copy = { ...project, pairingBoards: arr };
    project.pairingBoards.forEach((pb) => {
      if (pb.id === pairingBoard.id) {
        // this is the one we want to delete
        copy.people = [...copy.people, ...pb.people];
      } else {
        copy.pairingBoards.push(pb);
      }
    });
    console.log("setting project post deletion", copy);
    setProject(copy);
    return deletePairingBoard(project.id, pairingBoard.id);
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
    position.roles.forEach((r) => {
      if (r.id !== role.id) {
        arr.push(r);
      }
    });
    copy.pairingBoards[index] = { ...board, roles: arr };

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
    return postRole(project.id, pairingBoard.id, name).then((project) => {
      setProject(project);
    });
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
    putRolePosition(project.id, currentRoleBoard, role, position);
  };

  const destroyRole = (role: IRole) => {
    const currentPB = currentRolePairingBoard(role);

    if (currentPB) {
      const update = removeRole(role, project, currentPB);
      setProject(update);
      return deleteRole(project.id, currentPB, role);
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
    proj: IProject
  ): IProject => {
    const updatedProject = new Project(proj).removePerson(person);
    setProject(updatedProject);
    return updatedProject;
  };

  const movePerson = (person: IPerson, position?: IPairingBoard) => {
    const updatedProject = new Project(project).movePerson(person, position);
    updateProject(updatedProject);
    setProject(updatedProject);
  };

  const destroyPerson = (person: IPerson) => {
    const updatedProject = removePerson(
      person,
      project
    );
    setProject(updatedProject);
    return deletePerson(project.id, person.id);
  };

  const resetPairs = () => {
    const people: IPerson[] = [...project.people];
    const pbs: IPairingBoard[] = [];
    project.pairingBoards.forEach((pb) => {
      if (pb.exempt) {
        pbs.push({ ...pb });
      } else {
        pb.people.forEach((p) => people.push(p));
        pbs.push({ ...pb, people: [] });
      }
    });
    const updated = { ...project, pairingBoards: pbs, people };
    setProject(updated);
    updateProject(updated);
  };

  const getRecommendedPairs = () => {
    const pairingHistories = pairingArrangements.flatMap(arrangement => {
      return arrangement.pairingHistories.map(history => {
        return {
          pairingBoardName: history.pairingBoardName,
          people: history.people,
          pairingTime: history.pairingTime
        }
      });
    });
    const recommendedConfiguration = recommendPairs(project, pairingHistories);
    setProject(recommendedConfiguration);
    updateProject(recommendedConfiguration);
  };

  const savePairing = () => {
    postProjectPairing(project.id).then((newPairingRecords) => {
      setPairingArrangements(() => {
        setSystemAlert("Hello. We just recorded your pairs.");
        return newPairingRecords;
      });
    });
  };

  const value = {
    createPerson,
    createPairingBoard,
    destroyPairingBoard,
    createRole,
    movePerson,
    moveRole,
    destroyPerson,
    destroyRole,
    resetPairs,
    getRecommendedPairs,
    savePairing,
    pairingHistory: pairingArrangements,
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
