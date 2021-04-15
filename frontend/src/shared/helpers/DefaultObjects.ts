import { IPairingBoard } from "../../project/interfaces/IPairingBoard";
import { IPerson } from "../../project/interfaces/IPerson";
import { IProject } from "../../project/interfaces/IProject";
import { PairingHistoryDTO } from "../../project/interfaces/PairingHistoryDTO";

interface IDefaultObjects {
  project(): IProject;
  pairingBoard1(): IPairingBoard;
  pairingBoard2(): IPairingBoard;
  pairingBoard4(): IPairingBoard;
  exemptPairingBoard(): IPairingBoard;
  person1(): IPerson;
  person2(): IPerson;
  person3(): IPerson;
  person4(): IPerson;
  person5(): IPerson;
  person6(): IPerson;
  person7(): IPerson;
  role(): IRole;
  history(): PairingHistoryDTO[];
}

export const DefaultObjects: IDefaultObjects = {
  project: () => {
    return {
      name: "Test",
      id: 1,
      pairingBoards: [
        DefaultObjects.pairingBoard1(),
        DefaultObjects.pairingBoard2(),
        DefaultObjects.exemptPairingBoard(),
        DefaultObjects.pairingBoard4(),
      ],
      people: [
        DefaultObjects.person2(),
        DefaultObjects.person4(),
        DefaultObjects.person5(),
        DefaultObjects.person6(),
      ],
    };
  },

  pairingBoard1: () => {
    return {
      id: 1,
      name: "Cockatiel",
      exempt: false,
      people: [DefaultObjects.person1()],
      roles: [DefaultObjects.role()],
    };
  },

  pairingBoard2: () => {
    return {
      id: 2,
      name: "Trubador",
      exempt: false,
      people: [DefaultObjects.person3()],
      roles: [],
    };
  },

  pairingBoard4: () => {
    return {
      id: 4,
      name: "Truffle-hunter",
      exempt: false,
      people: [],
      roles: [],
    };
  },

  exemptPairingBoard: () => {
    return {
      id: 3,
      name: "Out of Office",
      exempt: true,
      people: [DefaultObjects.person7()],
      roles: [],
    };
  },

  person1: () => {
    return {
      id: 1,
      name: "Anthony",
    };
  },

  person2: () => {
    return {
      id: 2,
      name: "Hanchen",
    };
  },

  person3: () => {
    return {
      id: 3,
      name: "Cat",
    };
  },

  person4: () => {
    return {
      id: 4,
      name: "Darcie",
    };
  },

  person5: () => {
    return {
      id: 5,
      name: "Joe",
    };
  },

  person6: () => {
    return {
      id: 6,
      name: "Michael",
    };
  },

  person7: () => {
    return {
      id: 7,
      name: "Sylvia",
    };
  },

  role: () => {
    return {
      id: 1,
      name: "The only one",
    };
  },

  history: () => {
    return [
      {
        pairingBoardName: "Cockatiel",
        people: [DefaultObjects.person1(), DefaultObjects.person2()],
        pairingTime: "2021-01-22T03:02:33.288+0000",
      },
      {
        pairingBoardName: "Cockatiel",
        people: [DefaultObjects.person3()],
        pairingTime: "2021-01-21T03:02:33.288+0000",
      },
      {
        pairingBoardName: "Cockatiel",
        people: [DefaultObjects.person2(), DefaultObjects.person4()],
        pairingTime: "2021-01-20T03:02:33.288+0000",
      },
      {
        pairingBoardName: "Cockatiel",
        people: [DefaultObjects.person3(), DefaultObjects.person4()],
        pairingTime: "2021-01-19T03:02:33.288+0000",
      },
      {
        pairingBoardName: "Cockatiel",
        people: [DefaultObjects.person3(), DefaultObjects.person1()],
        pairingTime: "2021-01-18T03:02:33.288+0000",
      },
      {
        pairingBoardName: "Cockatiel",
        people: [
          DefaultObjects.person3(),
          DefaultObjects.person1(),
          DefaultObjects.person4(),
          DefaultObjects.person2(),
        ],
        pairingTime: "2021-01-17T03:02:33.288+0000",
      },
    ];
  },
};
