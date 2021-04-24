import { IPerson } from "./IPerson";
import {append, assoc} from "ramda";

export interface IPairingBoard {
  id: number;
  name: string;
  exempt: boolean;
  people: IPerson[];
  roles: IRole[];
}

export const add = (person: IPerson, board: IPairingBoard): IPairingBoard => {
    return assoc('people', append(person, board.people), board);
}