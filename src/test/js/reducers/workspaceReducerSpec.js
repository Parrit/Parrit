var deepFreeze = require('deep-freeze');
var workspaceReducer = require('reducers/workspaceReducer.js');

describe("workspaceReducer", function() {
	it("should get the default state", function() {
		var stateBefore = undefined;
		var action = {};
		var stateAfter = {
            spaces: [
                {
                    name: 'Floating',
                    people: [
                        {
                            name: 'Tim'
                        },
                        {
                            name: 'Gaurav'
                        },
                        {
                            name: 'Marianna'
                        },
                        {
                            name: 'Tony'
                        },
                        {
                            name: 'Pete'
                        },
                        {
                            name: 'Jared'
                        },
                        {
                            name: 'Fonzie'
                        },
                        {
                            name: 'Brian'
                        },
                        {
                            name: 'Kea'
                        },
                        {
                            name: 'Lance'
                        },
                        {
                            name: 'Liz'
                        },
                        {
                            name: 'Sree'
                        }
                    ]
                },
                {
                    name: 'Design',
                    people: []
                },
                {
                    name: 'Product',
                    people: []
                },
                {
                    name: 'Wellesley',
                    people: []
                },
                {
                    name: 'Pico2',
                    people: []
                },
                {
                    name: 'Manchester',
                    people: []
                },
                {
                    name: 'Larchmont',
                    people: []
                },
                {
                    name: 'Culver',
                    people: []
                },
                {
                    name: 'Out of Office',
                    people: []
                }
            ]
		};

		expect(
			workspaceReducer(stateBefore, action)
		).toEqual(stateAfter);
	});

    describe("actions", function() {
        describe("LOAD_STATE", function() {
            it("should set the state to the passed in 'settings'", function() {
                var stateBefore = {
                    spaces: []
                };

                var action = {
                    type: "LOAD_STATE",
                    state: {
                        workspace: {
                            shoobadooba: "doobadoowa"
                        },
                        settings: {
                            canMove: true
                        }
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
        });
    });
});
