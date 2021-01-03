import Axios from "axios";

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

export function postPerson(projectId: number, name: string): Promise<IPerson> {
  return Axios.post(
    "/api/project/" + encodeURIComponent(projectId) + "/person",
    {
      name,
    }
  );
}

export function putPersonPosition(
  projectId: number,
  personId: string,
  newPosition: string
): Promise<void> {
  return Axios.put(
    "/api/project/" +
      encodeURIComponent(projectId) +
      "/person/" +
      encodeURIComponent(personId) +
      "/position",
    newPosition
  );
}

export function deletePerson(projectId: number, personId: number) {
  return Axios.delete(
    "/api/project/" +
      encodeURIComponent(projectId) +
      "/person/" +
      encodeURIComponent(personId)
  );
}

export function postPairingBoard(
  projectId: number,
  name: string
): Promise<IPairingBoard> {
  return Axios.post(
    "/api/project/" + encodeURIComponent(projectId) + "/pairingBoard",
    { name }
  );
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
): Promise<void> {
  return Axios.delete(
    "/api/project/" +
      encodeURIComponent(projectId) +
      "/pairingBoard/" +
      encodeURIComponent(pairingBoardId)
  );
}

export function postRole(
  projectId: number,
  pairingBoardId: number,
  name: string
): Promise<IRole> {
  return Axios.post(
    "/api/project/" +
      encodeURIComponent(projectId) +
      "/pairingBoard/" +
      encodeURIComponent(pairingBoardId) +
      "/role",
    { name }
  );
}

export function putRolePosition(
  projectId: number,
  pairingBoardId: string,
  roleId: string,
  newPosition: string
): Promise<void> {
  return Axios.put(
    "/api/project/" +
      encodeURIComponent(projectId) +
      "/pairingBoard/" +
      encodeURIComponent(pairingBoardId) +
      "/role/" +
      encodeURIComponent(roleId) +
      "/position",
    newPosition
  );
}

export function deleteRole(
  projectId: number,
  pairingBoardId: string,
  roleId: string
): Promise<void> {
  return Axios.delete(
    "/api/project/" +
      encodeURIComponent(projectId) +
      "/pairingBoard/" +
      encodeURIComponent(pairingBoardId) +
      "/role/" +
      encodeURIComponent(roleId)
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
