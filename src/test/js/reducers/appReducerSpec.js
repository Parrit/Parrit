var appReducer = require('../../../main/js/reducers/appReducer.js');

describe("appReducer", function() {
	it("should get the default state", function() {
		var stateBefore = undefined;
		var action = {};
		var stateAfter = {
			settings: {
				canMove: true
			},
			workspace: {
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
			}
		};

		expect(
			appReducer(stateBefore, action)
		).toEqual(stateAfter);
	});
});

