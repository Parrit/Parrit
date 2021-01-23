import { IPairingBoard } from "./IPairingBoard";
import { IPerson } from "./IPerson";

export interface IProject {
  name: string;
  id: number;
  pairingBoards: IPairingBoard[];
  people: IPerson[];
}
