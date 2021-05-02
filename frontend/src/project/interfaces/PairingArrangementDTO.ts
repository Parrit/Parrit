import {PairingHistoryDTO} from "./PairingHistoryDTO";

export interface PairingArrangementDTO {
    pairingHistories: PairingHistoryDTO[];
    pairingTime: string;
    id: number;
}