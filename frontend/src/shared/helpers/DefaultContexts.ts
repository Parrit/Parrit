import { IApiContext } from "./ApiContext";

interface IDefaultContexts {
  apiContext(): IApiContext;
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
    };
  },
};
