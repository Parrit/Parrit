import { IPerson } from "./IPerson";

export interface IPairingBoard {
  id: number;
  name: string;
  exempt: boolean;
  people: IPerson[];
  roles: IRole[];
}
