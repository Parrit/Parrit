import Axios from "axios";
import { IPairingBoard } from "../../project/interfaces/IPairingBoard";
import { IPairingHistoryRecord } from "../../project/interfaces/IPairingHistory";
import { IPerson } from "../../project/interfaces/IPerson";
import { IProject } from "../../project/interfaces/IProject";

Axios.defaults.headers.post["Content-Type"] = "application/json";

export function postLoginAndRedirect(
  name: string,
  password: string
): Promise<void> {
  return Axios.post("/api/login", { name, password }).then((response) => {
    window.location.href = response.data;
  });
}

export function postLogout() {
  Axios.post("/api/logout").then((response) => {
    window.location.href = "/";
  });
}

export function postProject(name: string, password: string): Promise<void> {
  return Axios.post("/api/project", { name, password });
}

export function resetProject(projectId: number): Promise<void> {
  return Axios.put("/api/project/" + encodeURIComponent(projectId) + "/reset");
}

export function postPerson(projectId: number, name: string): Promise<IProject> {
  return Axios.post<IProject>(
    "/api/project/" + encodeURIComponent(projectId) + "/person",
    {
      name,
    }
  ).then((response) => response.data);
}

export function putPersonPosition(
  projectId: number,
  person: IPerson,
  newPosition?: IPairingBoard
): Promise<IProject> {
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
}

export function deletePerson(
  projectId: number,
  personId: number
): Promise<IProject> {
  return Axios.delete<IProject>(
    "/api/project/" +
      encodeURIComponent(projectId) +
      "/person/" +
      encodeURIComponent(personId)
  ).then((response) => response.data);
}

export function postPairingBoard(
  projectId: number,
  name: string
): Promise<IProject> {
  return Axios.post<IProject>(
    "/api/project/" + encodeURIComponent(projectId) + "/pairingBoard",
    { name }
  ).then((response) => response.data);
}

export function putPairingBoard(
  projectId: number,
  pairingBoardId: number,
  name: string
): Promise<void> {
  return Axios.put(
    "/api/project/" +
      encodeURIComponent(projectId) +
      "/pairingBoard/" +
      encodeURIComponent(pairingBoardId),
    { name }
  );
}

export function deletePairingBoard(
  projectId: number,
  pairingBoardId: number
): Promise<IProject> {
  return Axios.delete<IProject>(
    "/api/project/" +
      encodeURIComponent(projectId) +
      "/pairingBoard/" +
      encodeURIComponent(pairingBoardId)
  ).then((response) => response.data);
}

export function postRole(
  projectId: number,
  pairingBoardId: number,
  name: string
): Promise<IProject> {
  return Axios.post<IProject>(
    "/api/project/" +
      encodeURIComponent(projectId) +
      "/pairingBoard/" +
      encodeURIComponent(pairingBoardId) +
      "/role",
    { name }
  ).then((response) => response.data);
}

interface RolePositionDTO {
  pairingBoardId: number;
}

export function putRolePosition(
  projectId: number,
  oldPairingBoard: IPairingBoard,
  role: IRole,
  newPairingBoard: IPairingBoard
): Promise<IProject> {
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
}

export function deleteRole(
  projectId: number,
  pairingBoard: IPairingBoard,
  role: IRole
): Promise<void> {
  return Axios.delete(
    "/api/project/" +
      encodeURIComponent(projectId) +
      "/pairingBoard/" +
      encodeURIComponent(pairingBoard.id) +
      "/role/" +
      encodeURIComponent(role.id)
  );
}

export function postProjectPairing(projectId: number): Promise<void> {
  return Axios.post(
    "/api/project/" + encodeURIComponent(projectId) + "/pairing"
  );
}

export function getRecommendedPairing(projectId: number): Promise<void> {
  return Axios.get(
    "/api/project/" + encodeURIComponent(projectId) + "/pairing/recommend"
  );
}

export function getPairingHistory(
  projectId: number
): Promise<IPairingHistoryRecord[]> {
  return Axios.get<IPairingHistoryRecord[]>(
    "/api/project/" + encodeURIComponent(projectId) + "/pairing/history"
  ).then((response) => {
    return response.data;
  });
}
