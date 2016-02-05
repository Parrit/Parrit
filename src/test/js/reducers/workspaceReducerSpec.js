var deepFreeze = require('deep-freeze');
var workspaceReducer = require('../../../main/js/reducers/workspaceReducer.js');

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
    });
});
