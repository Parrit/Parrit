var deepFreeze = require('deep-freeze');
var workspaceReducer = require('reducers/workspaceReducer.js');

describe("workspaceReducer", function() {
	it("should get the default state", function() {
		var stateBefore = undefined;
		var action = {};
		var stateAfter = {
            id: 0,
            people: [],
            spaces: []
		};

		expect(
			workspaceReducer(stateBefore, action)
		).toEqual(stateAfter);
	});

    describe("actions", function() {
        describe("LOAD_WORKSPACE", function() {
            it("should set the state to the passed in 'settings'", function() {
                var stateBefore = {
                    spaces: []
                };

                var action = {
                    type: "LOAD_WORKSPACE",
                    workspace: {
                        shoobadooba: "doobadoowa"
                    }
                };

                var stateAfter = {
                    shoobadooba: "doobadoowa"
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    workspaceReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe("MOVE_PERSON", function() {
            it('should move a person between spaces', function() {
                var stateBefore = {
                    id: 7,
                    people: [],
                    spaces: [
                        {
                            name: "USS Enterprise",
                            people: [{name:"Captain Kirk"}]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }]
                };

                var action = {
                    type: "MOVE_PERSON",
                    toSpaceIndex: 1,
                    fromSpaceIndex: 0,
                    personIndex: 0
                };

                var stateAfter = {
                    id: 7,
                    people: [],
                    spaces: [
                        {
                            name: "USS Enterprise",
                            people: []
                        },
                        {
                            name: "Klingon Warbird",
                            people: [{name:"Captain Kirk"}]
                        }]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    workspaceReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });

            it('should move a person from the workspace to a space', function() {
                var stateBefore = {
                    id: 7,
                    people: [{name:"Captain Kirk"}],
                    spaces: [
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
                    toSpaceIndex: 1,
                    fromSpaceIndex: -1,
                    personIndex: 0
                };

                var stateAfter = {
                    id: 7,
                    people: [],
                    spaces: [
                        {
                            name: "USS Enterprise",
                            people: []
                        },
                        {
                            name: "Klingon Warbird",
                            people: [{name:"Captain Kirk"}]
                        }]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    workspaceReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });

            it('should move a person from space to the workspace', function() {
                var stateBefore = {
                    id: 7,
                    people: [],
                    spaces: [
                        {
                            name: "USS Enterprise",
                            people: []
                        },
                        {
                            name: "Klingon Warbird",
                            people: [{name:"Captain Kirk"}]
                        }]
                };

                var action = {
                    type: "MOVE_PERSON",
                    toSpaceIndex: -1,
                    fromSpaceIndex: 1,
                    personIndex: 0
                };

                var stateAfter = {
                    id: 7,
                    people: [{name:"Captain Kirk"}],
                    spaces: [
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
                    workspaceReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe('CREATE_PERSON', function() {
            it('adds a person to the workspace', function() {
                var stateBefore = {
                    id: 7,
                    people: [],
                    spaces: [
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
                    spaces: [
                        {
                            name: "OUTER",
                            people: []
                        }
                    ]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    workspaceReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe('CREATE_SPACE', function() {
            it('adds a space to the workspace', function() {
                var stateBefore = {
                    id: 7,
                    people: [],
                    spaces: [
                        {
                            name: "OUTER",
                            people: []
                        }
                    ]
                };

                var action = {
                    type: "CREATE_SPACE",
                    name: "Alabama"
                };

                var stateAfter = {
                    id: 7,
                    people: [],
                    spaces: [
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
                    workspaceReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe("DELETE_PERSON", function() {
            it('should delete a person from a space', function() {
                var stateBefore = {
                    id: 7,
                    people: [],
                    spaces: [
                        {
                            name: "USS Enterprise",
                            people: [
                                { name:"Captain Kirk" },
                                { name:"Spock" }
                            ]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }]
                };

                var action = {
                    type: "DELETE_PERSON",
                    spaceIndex: 0,
                    personIndex: 1
                };

                var stateAfter = {
                    id: 7,
                    people: [],
                    spaces: [
                        {
                            name: "USS Enterprise",
                            people: [{ name:"Captain Kirk" }]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    workspaceReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });

            it('should delete a person from the workspace', function() {
                var stateBefore = {
                    id: 7,
                    people: [{ name: 'Albert Einstein' }],
                    spaces: [
                        {
                            name: "USS Enterprise",
                            people: [
                                { name:"Captain Kirk" },
                                { name:"Spock" }
                            ]
                        },
                        {
                            name: "Klingon Warbird",
                            people: []
                        }]
                };

                var action = {
                    type: "DELETE_PERSON",
                    spaceIndex: -1,
                    personIndex: 0
                };

                var stateAfter = {
                    id: 7,
                    people: [],
                    spaces: [
                        {
                            name: "USS Enterprise",
                            people: [
                                { name:"Captain Kirk" },
                                { name:"Spock" }
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
                    workspaceReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });
    });
});
