var deepFreeze = require('deep-freeze');
var projectReducer = require('project/reducers/projectReducer.js');

describe("projectReducer", function () {
    it("should get the default state", function () {
        var stateBefore = undefined;
        var action = {};
        var stateAfter = {
            id: 0,
            people: [],
            pairingBoards: []
        };

        expect(
            projectReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

    describe("actions", function () {
        describe("LOAD_PROJECT", function () {
            it("should set the project to the passed in project object", function () {
                var stateBefore = {
                    pairingBoards: []
                };

                var action = {
                    type: "LOAD_PROJECT",
                    project: {
                        shoobadooba: "doobadoowa"
                    }
                };

                var stateAfter = {
                    shoobadooba: "doobadoowa"
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    projectReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe("MOVE_PERSON", function () {
            it('should move a person between pairingBoards', function () {
                var stateBefore = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [{name: "Captain Kirk"}]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }]
                };

                var action = {
                    type: "MOVE_PERSON",
                    toPairingBoardIndex: 1,
                    fromPairingBoardIndex: 0,
                    personIndex: 0
                };

                var stateAfter = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: []
                        },
                        {
                            name: "Klingon Warbird",
                            people: [{name: "Captain Kirk"}]
                        }]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    projectReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });

            it('should move a person from the project to a pairing board', function () {
                var stateBefore = {
                    id: 7,
                    people: [{name: "Captain Kirk"}],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: []
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }]
                };

                var action = {
                    type: "MOVE_PERSON",
                    toPairingBoardIndex: 1,
                    fromPairingBoardIndex: -1,
                    personIndex: 0
                };

                var stateAfter = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: []
                        },
                        {
                            name: "Klingon Warbird",
                            people: [{name: "Captain Kirk"}]
                        }]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    projectReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });

            it('should move a person from pairing board to the project', function () {
                var stateBefore = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: []
                        },
                        {
                            name: "Klingon Warbird",
                            people: [{name: "Captain Kirk"}]
                        }]
                };

                var action = {
                    type: "MOVE_PERSON",
                    toPairingBoardIndex: -1,
                    fromPairingBoardIndex: 1,
                    personIndex: 0
                };

                var stateAfter = {
                    id: 7,
                    people: [{name: "Captain Kirk"}],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: []
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    projectReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe('RESET_PAIRING_BOARD', function() {
            it('moves all people from pairing boards to floating', function() {
                var stateBefore = {
                    id: 7,
                    people: [{name: "Bubba Gump"}],
                    pairingBoards: [
                        {
                            name: "BOARD1",
                            people: [{name:"Charles Shaw"}]
                        },
                        {
                            name: "BOARD2",
                            people: [
                                {name: "Hanzle"},
                                {name: "Gretel"}
                            ]
                        }
                    ]
                };
                
                var action = { type: 'RESET_PAIRING_BOARD' };
                
                var stateAfter = {
                    id: 7,
                    people: [
                        {name: "Bubba Gump"},
                        {name:"Charles Shaw"},
                        {name: "Hanzle"},
                        {name: "Gretel"}
                    ],
                    pairingBoards: [
                        {
                            name: "BOARD1",
                            people: []
                        },
                        {
                            name: "BOARD2",
                            people: []
                        }
                    ]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    projectReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });

            it('does not move people on exempt pairing boards to floating', function() {
                var stateBefore = {
                    id: 7,
                    people: [{name: "Bubba Gump"}],
                    pairingBoards: [
                        {
                            name: "BOARD1",
                            people: [{name:"Charles Shaw"}]
                        },
                        {
                            name: "BOARD2",
                            people: [
                                {name: "Hansel"},
                                {name: "Gretel"}
                            ]
                        },
                        {
                          name: "OOO",
                          exempt: true,
                          people: [{name: "Rip van Winkle"}]
                        }
                    ]
                };

                var action = { type: 'RESET_PAIRING_BOARD' };

                var stateAfter = {
                    id: 7,
                    people: [
                        {name: "Bubba Gump"},
                        {name:"Charles Shaw"},
                        {name: "Hansel"},
                        {name: "Gretel"}
                    ],
                    pairingBoards: [
                        {
                            name: "BOARD1",
                            people: []
                        },
                        {
                            name: "BOARD2",
                            people: []
                        },
                        {
                          name: "OOO",
                          exempt: true,
                          people: [{name: "Rip van Winkle"}]
                        }
                    ]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);
                
                expect(
                    projectReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe('CREATE_PERSON', function () {
            it('adds a person to the project', function () {
                var stateBefore = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "OUTER",
                            people: []
                        }
                    ]
                };

                var action = {
                    type: "CREATE_PERSON",
                    name: "Bubba Gump"
                };

                var stateAfter = {
                    id: 7,
                    people: [{name: "Bubba Gump"}],
                    pairingBoards: [
                        {
                            name: "OUTER",
                            people: []
                        }
                    ]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    projectReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe('CREATE_PAIRING_BOARD', function () {
            it('adds a pairing board to the project', function () {
                var stateBefore = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "OUTER",
                            people: []
                        }
                    ]
                };

                var action = {
                    type: "CREATE_PAIRING_BOARD",
                    name: "Alabama"
                };

                var stateAfter = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "OUTER",
                            people: []
                        },
                        {
                            name: "Alabama",
                            people: []
                        }
                    ]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    projectReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe("DELETE_PERSON", function () {
            it('should delete a person from a pairing board', function () {
                var stateBefore = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [
                                {name: "Captain Kirk"},
                                {name: "Spock"}
                            ]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }]
                };

                var action = {
                    type: "DELETE_PERSON",
                    pairingBoardIndex: 0,
                    personIndex: 1
                };

                var stateAfter = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [{name: "Captain Kirk"}]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }
                    ]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    projectReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });

            it('should delete a person from the project', function () {
                var stateBefore = {
                    id: 7,
                    people: [{name: 'Albert Einstein'}],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [
                                {name: "Captain Kirk"},
                                {name: "Spock"}
                            ]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }]
                };

                var action = {
                    type: "DELETE_PERSON",
                    pairingBoardIndex: -1,
                    personIndex: 0
                };

                var stateAfter = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [
                                {name: "Captain Kirk"},
                                {name: "Spock"}
                            ]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    projectReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe("DELETE_PAIRING_BOARD", function () {
            it('should delete a pairing board', function () {
                var stateBefore = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [
                                {name: "Captain Kirk"},
                                {name: "Spock"}
                            ]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }
                    ]
                };

                var action = {
                    type: "DELETE_PAIRING_BOARD",
                    pairingBoardIndex: 1
                };

                var stateAfter = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [
                                {name: "Captain Kirk"},
                                {name: "Spock"}
                            ]
                        }
                    ]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    projectReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });

            it('should move all of the people from the pairing board to the project', function () {
                var stateBefore = {
                    id: 7,
                    people: [{name: 'Albert Einstein'}],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [
                                {name: "Captain Kirk"},
                                {name: "Spock"}
                            ]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }
                    ]
                };

                var action = {
                    type: "DELETE_PAIRING_BOARD",
                    pairingBoardIndex: 0
                };

                var stateAfter = {
                    id: 7,
                    people: [
                        {name: 'Albert Einstein'},
                        {name: "Captain Kirk"},
                        {name: "Spock"}
                    ],
                    pairingBoards: [
                        {
                            name: "Klingon Warbird",
                            people: []
                        }
                    ]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    projectReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe("RENAME_PAIRING_BOARD", function () {
            it('should rename a pairing board', function () {
                var stateBefore = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [
                                {name: "Captain Kirk"},
                                {name: "Spock"}
                            ]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }
                    ]
                };

                var action = {
                    type: "RENAME_PAIRING_BOARD",
                    pairingBoardIndex: 1,
                    name: "Awesome Pairing Board"
                };

                var stateAfter = {
                    id: 7,
                    people: [],
                    pairingBoards: [
                        {
                            name: "USS Enterprise",
                            people: [
                                {name: "Captain Kirk"},
                                {name: "Spock"}
                            ]
                        },
                        {
                            name: "Awesome Pairing Board",
                            people: []
                        }
                    ]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    projectReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });
    });
});
