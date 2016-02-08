var _ = require('lodash');

var workspaceReducer = function(state, action) {
	if(typeof state === 'undefined') {
		return {
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
	}

    switch (action.type) {
        case "LOAD_STATE":
            return action.state.workspace;
        case "MOVE_PERSON":
            var spacesClone = _.cloneDeep(state.spaces);

            var fromSpace = spacesClone[action.fromSpaceIndex];
            var toSpace = spacesClone[action.toSpaceIndex];

            toSpace.people.push(_.pullAt(fromSpace.people, action.personIndex)[0]);

            return {
                spaces: spacesClone
            };
        default:
            return state;
    }
};

module.exports = workspaceReducer;
