import { IPairingBoard } from "./IPairingBoard";
import { IPerson } from "./IPerson";

export interface IPairingHistoryRecord {
  pairingTime: Date;
  pairingBoardsWithPeople: IPairingBoard[];
  pairingBoardName: string;
  people: IPerson[];
}
