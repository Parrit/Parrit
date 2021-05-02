import { IAppContext } from "../../project/components/App";
import { IApiContext } from "./ApiContext";

interface IDefaultContexts {
  apiContext(): IApiContext;
  appContext(): IAppContext;
}

export const DefaultContexts: IDefaultContexts = {
  apiContext: () => {
    return {
      postLoginAndRedirect: jest.fn(),
      postLogout: jest.fn(),
      postProject: jest.fn(),
      resetProject: jest.fn(),
      postPerson: jest.fn(),
      putPersonPosition: jest.fn(),
      deletePerson: jest.fn(),
      postPairingBoard: jest.fn(),
      putPairingBoard: jest.fn(),
      deletePairingBoard: jest.fn(),
      postRole: jest.fn(),
      putRolePosition: jest.fn(),
      deleteRole: jest.fn(),
      postProjectPairing: jest.fn(),
      getRecommendedPairing: jest.fn(),
      getPairingHistory: jest.fn(),
      updateProject: jest.fn(),
      deletePairingArrangementRequest: jest.fn(),
    };
  },

  appContext: () => {
    return {
      pairingHistoryOpen: false,
      setPairingHistoryOpen: jest.fn(),
      setSystemAlert: jest.fn(),
    };
  },
};
