interface IPairingHistoryRecord {
  pairingTime: Date;
  pairingBoardsWithPeople: IPairingBoard[];
  pairingBoardName: string;
  people: IPerson[];
}
