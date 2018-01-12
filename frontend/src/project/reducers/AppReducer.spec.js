import appReducer from './AppReducer.js';

describe("AppReducer", () => {
        it("should get the default state", () => {
                const stateBefore = undefined;
                const action = {};
                const stateAfter = {
                        settings: {
                                modal: {
                                        isNewPersonModalOpen: false,
                                        isNewRoleModalOpen: false,
                                        isNewPairingBoardModalOpen: false,
                                        newPersonModalErrorMessage: undefined,
                                        newRoleModalErrorMessage: undefined,
                                        newPairingBoardModalErrorMessage: undefined
                                },
                                pairingBoardErrors: {},
                                pairingHistoryPanel: {
                                        isOpen: false
                                }
                        },
                        data: {
                                project: {
                                        id: 0,
                                        people: [],
                                        roles: [],
                                        pairingBoards: []
                                },
                                pairingHistory: {
                                        pairingHistoryList: []
                                }
                        }
                };

                expect(appReducer(stateBefore, action)).toEqual(stateAfter);
        });
});

