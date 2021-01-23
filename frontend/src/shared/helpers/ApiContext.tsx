import Axios, { AxiosError } from "axios";
import React from "react";
import { IPairingBoard } from "../../project/interfaces/IPairingBoard";
import { IPerson } from "../../project/interfaces/IPerson";
import { IProject } from "../../project/interfaces/IProject";
import { PairingHistoryDTO } from "../../project/interfaces/PairingHistoryDTO";

Axios.defaults.headers.post["Content-Type"] = "application/json";

export interface IApiContext {
  postLoginAndRedirect: (name: string, password: string) => Promise<any>;
  postLogout: VoidFunction;
  postProject: (name: string, password: string) => Promise<any>;
  resetProject: (projectId: number) => Promise<IProject>;
  postPerson: (projectId: number, name: string) => Promise<IProject>;
  putPersonPosition: (
    projectId: number,
    person: IPerson,
    newPosition?: IPairingBoard
  ) => Promise<IProject>;
  deletePerson: (projectId: number, personId: number) => Promise<IProject>;
  postPairingBoard: (projectId: number, name: string) => Promise<IProject>;
  putPairingBoard: (
    projectId: number,
    pairingBoardId: number,
    name: string
  ) => Promise<void>;
  deletePairingBoard: (
    projectId: number,
    pairingBoardId: number
  ) => Promise<IProject>;
  postRole: (
    projectId: number,
    pairingBoardId: number,
    name: string
  ) => Promise<IProject>;
  putRolePosition: (
    projectId: number,
    oldPairingBoard: IPairingBoard,
    role: IRole,
    newPairingBoard: IPairingBoard
  ) => Promise<IProject>;
  deleteRole(
    projectId: number,
    pairingBoard: IPairingBoard,
    role: IRole
  ): Promise<void>;
  postProjectPairing(projectId: number): Promise<PairingHistoryDTO[]>;
  getRecommendedPairing(projectId: number): Promise<IProject>;
  getPairingHistory(projectId: number): Promise<PairingHistoryDTO[]>;
}

export const ApiContext = React.createContext({} as IApiContext);

export const ApiProvider: React.FC = (props) => {
  const postLoginAndRedirect = (
    name: string,
    password: string
  ): Promise<any> => {
    return Axios.post("/api/login", { name, password })
      .then((response) => {
        window.location.href = response.data;
        return response;
      })
      .catch((error: AxiosError) => {
        throw error.response?.data;
      });
  };

  const postLogout = () => {
    Axios.post("/api/logout").then((response) => {
      window.location.href = "/";
    });
  };

  const postProject = (name: string, password: string): Promise<any> => {
    return Axios.post("/api/project", { name, password }).catch(
      (error: AxiosError) => {
        throw error.response?.data;
      }
    );
  };

  const resetProject = (projectId: number): Promise<IProject> => {
    return Axios.put<IProject>(
      "/api/project/" + encodeURIComponent(projectId) + "/reset"
    ).then((response) => response.data);
  };

  const postPerson = (projectId: number, name: string): Promise<IProject> => {
    return Axios.post<IProject>(
      "/api/project/" + encodeURIComponent(projectId) + "/person",
      {
        name,
      }
    ).then((response) => response.data);
  };

  const putPersonPosition = (
    projectId: number,
    person: IPerson,
    newPosition?: IPairingBoard
  ): Promise<IProject> => {
    const positionDTO = {
      // translate frontend data structure into backend data structure
      floating: !newPosition,
      pairingBoardId: newPosition?.id,
    };
    return Axios.put<IProject>(
      "/api/project/" +
        encodeURIComponent(projectId) +
        "/person/" +
        encodeURIComponent(person.id) +
        "/position",
      positionDTO
    ).then((response) => response.data);
  };

  const deletePerson = (
    projectId: number,
    personId: number
  ): Promise<IProject> => {
    return Axios.delete<IProject>(
      "/api/project/" +
        encodeURIComponent(projectId) +
        "/person/" +
        encodeURIComponent(personId)
    ).then((response) => response.data);
  };

  const postPairingBoard = (
    projectId: number,
    name: string
  ): Promise<IProject> => {
    return Axios.post<IProject>(
      "/api/project/" + encodeURIComponent(projectId) + "/pairingBoard",
      { name }
    ).then((response) => response.data);
  };

  const putPairingBoard = (
    projectId: number,
    pairingBoardId: number,
    name: string
  ): Promise<void> => {
    return Axios.put(
      "/api/project/" +
        encodeURIComponent(projectId) +
        "/pairingBoard/" +
        encodeURIComponent(pairingBoardId),
      { name }
    );
  };

  const deletePairingBoard = (
    projectId: number,
    pairingBoardId: number
  ): Promise<IProject> => {
    return Axios.delete<IProject>(
      "/api/project/" +
        encodeURIComponent(projectId) +
        "/pairingBoard/" +
        encodeURIComponent(pairingBoardId)
    ).then((response) => response.data);
  };

  const postRole = (
    projectId: number,
    pairingBoardId: number,
    name: string
  ): Promise<IProject> => {
    return Axios.post<IProject>(
      "/api/project/" +
        encodeURIComponent(projectId) +
        "/pairingBoard/" +
        encodeURIComponent(pairingBoardId) +
        "/role",
      { name }
    ).then((response) => response.data);
  };

  interface RolePositionDTO {
    pairingBoardId: number;
  }

  const putRolePosition = (
    projectId: number,
    oldPairingBoard: IPairingBoard,
    role: IRole,
    newPairingBoard: IPairingBoard
  ): Promise<IProject> => {
    const data: RolePositionDTO = {
      pairingBoardId: newPairingBoard.id,
    };
    return Axios.put<IProject>(
      "/api/project/" +
        encodeURIComponent(projectId) +
        "/pairingBoard/" +
        encodeURIComponent(oldPairingBoard.id) +
        "/role/" +
        encodeURIComponent(role.id) +
        "/position",
      data
    ).then((response) => response.data);
  };

  const deleteRole = (
    projectId: number,
    pairingBoard: IPairingBoard,
    role: IRole
  ): Promise<void> => {
    return Axios.delete(
      "/api/project/" +
        encodeURIComponent(projectId) +
        "/pairingBoard/" +
        encodeURIComponent(pairingBoard.id) +
        "/role/" +
        encodeURIComponent(role.id)
    );
  };

  const postProjectPairing = (
    projectId: number
  ): Promise<PairingHistoryDTO[]> => {
    return Axios.post<PairingHistoryDTO[]>(
      "/api/project/" + encodeURIComponent(projectId) + "/pairing"
    ).then((response) => response.data);
  };

  const getRecommendedPairing = (projectId: number): Promise<IProject> => {
    return Axios.get<IProject>(
      "/api/project/" + encodeURIComponent(projectId) + "/pairing/recommend"
    ).then((response) => response.data);
  };

  const getPairingHistory = (
    projectId: number
  ): Promise<PairingHistoryDTO[]> => {
    return Axios.get<PairingHistoryDTO[]>(
      "/api/project/" + encodeURIComponent(projectId) + "/pairing/history"
    ).then((response) => {
      return response.data;
    });
  };

  const value = {
    postLoginAndRedirect,
    postLogout,
    postProject,
    resetProject,
    postPerson,
    putPersonPosition,
    deletePerson,
    deletePairingBoard,
    deleteRole,
    postPairingBoard,
    putPairingBoard,
    postRole,
    putRolePosition,
    postProjectPairing,
    getRecommendedPairing,
    getPairingHistory,
  };

  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  );
};
