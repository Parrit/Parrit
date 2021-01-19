import { IPerson } from "./IPerson";

export interface PairingHistoryDTO {
  pairingBoardName: string;
  people: IPerson[];
  pairingTime: string;
}
