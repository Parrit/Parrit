var _ = require('lodash');

var projectReducer = function(state, action) {
	if(typeof state === 'undefined') {
		return {
            id: 0,
            people: [],
            pairingBoards: []
		};
	}

    switch (action.type) {
        case "LOAD_PROJECT":
            return action.project;
        case "MOVE_PERSON":
            var stateClone = _.cloneDeep(state);

            var fromPairingBoard = action.fromPairingBoardIndex >=0 ? stateClone.pairingBoards[action.fromPairingBoardIndex] : stateClone;
            var toPairingBoard = action.toPairingBoardIndex >=0 ? stateClone.pairingBoards[action.toPairingBoardIndex] : stateClone;

            toPairingBoard.people.push(_.pullAt(fromPairingBoard.people, action.personIndex)[0]);

            return stateClone;
        case "RESET_PAIRING_BOARD":
            var stateClone = _.cloneDeep(state);

            // forEach pairing board
                // take people array
                // set people array to []
            // take all people and append to "people"
						// unless the board is an exempt board
            stateClone.people = stateClone.people.concat(
                stateClone.pairingBoards.reduce(function( people, pairingBoard ) {
										if (pairingBoard.exempt) return people;

                    people = people.concat( pairingBoard.people );
                    pairingBoard.people = [];
                    return people;
                }, [])
            );

            return stateClone;
        case "CREATE_PERSON":
            var stateClone = _.cloneDeep(state);

            stateClone.people.push({name: action.name});

            return stateClone;
        case "CREATE_PAIRING_BOARD":
            var stateClone = _.cloneDeep(state);

            stateClone.pairingBoards.push({name: action.name, people: []});

            return stateClone;
        case "DELETE_PERSON":
            var stateClone = _.cloneDeep(state);

            var pairingBoard = action.pairingBoardIndex >=0 ? stateClone.pairingBoards[action.pairingBoardIndex] : stateClone;
            _.pullAt(pairingBoard.people, action.personIndex);

            return stateClone;
        case "DELETE_PAIRING_BOARD":
            var stateClone = _.cloneDeep(state);

            stateClone.people = stateClone.people.concat(stateClone.pairingBoards[action.pairingBoardIndex].people);
            _.pullAt(stateClone.pairingBoards, action.pairingBoardIndex);

            return stateClone;
        case "RENAME_PAIRING_BOARD":
            var stateClone = _.cloneDeep(state);

            stateClone.pairingBoards[action.pairingBoardIndex].name = action.name;

            return stateClone;
        default:
            return state;
    }
};

module.exports = projectReducer;
