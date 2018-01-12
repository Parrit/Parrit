import * as _ from 'lodash';

const initialState = {
    id: 0,
    people: [],
    roles: [],
    pairingBoards: []
};

export default function (state = initialState, action) {
    let stateClone;
    switch (action.type) {
        case "LOAD_PROJECT":
            return action.project;
        case "MOVE_ASSIGMENT":
            stateClone = _.cloneDeep(state);

            const fromPairingBoard = action.fromPairingBoardIndex >= 0 ? stateClone.pairingBoards[action.fromPairingBoardIndex] : stateClone;
            const toPairingBoard = action.toPairingBoardIndex >= 0 ? stateClone.pairingBoards[action.toPairingBoardIndex] : stateClone;

            switch (action.assignmentType) {
                case "ROLE":
                    toPairingBoard.roles.push(_.pullAt(fromPairingBoard.roles, action.assignmentIndex)[0]);
                    break;
                case "PERSON":
                    toPairingBoard.people.push(_.pullAt(fromPairingBoard.people, action.assignmentIndex)[0]);
                    break;
            }

            return stateClone;
        case "RESET_PAIRING_BOARD":
            stateClone = _.cloneDeep(state);

            // forEach pairing board
            // take people array
            // set people array to []
            // take all people and append to "people"
            // unless the board is an exempt board
            stateClone.people = stateClone.people.concat(
                stateClone.pairingBoards.reduce(function (people, pairingBoard) {
                    if (pairingBoard.exempt) return people;

                    people = people.concat(pairingBoard.people);
                    pairingBoard.people = [];
                    return people;
                }, [])
            );

            return stateClone;
        case "SMART_RESET_BOARD":
            stateClone = _.cloneDeep(state);

            // forEach pairing board
            // take people array
            // set people array to [<last-person>]
            // take all remaining people and append to "people"
            // unless the board is an exempt board
            stateClone.people = stateClone.people.concat(
                stateClone.pairingBoards.reduce(function (people, pairingBoard) {
                    if (pairingBoard.exempt) return people;

                    while(pairingBoard.people.length > 1) {
                        people.push(pairingBoard.people.pop())
                    }

                    return people;
                }, [])
            );

            return stateClone;
        case "DELETE_ASSIGNMENT":
            stateClone = _.cloneDeep(state);

            const pairingBoard = action.pairingBoardIndex >= 0 ? stateClone.pairingBoards[action.pairingBoardIndex] : stateClone;

            switch (action.assignmentType) {
                case "ROLE":
                    _.pullAt(pairingBoard.roles, action.assignmentIndex);
                    break;
                case "PERSON":
                    _.pullAt(pairingBoard.people, action.assignmentIndex);
                    break;
            }


            return stateClone;
        case "DELETE_PAIRING_BOARD":
            stateClone = _.cloneDeep(state);

            stateClone.people = stateClone.people.concat(stateClone.pairingBoards[action.pairingBoardIndex].people);
            _.pullAt(stateClone.pairingBoards, action.pairingBoardIndex);

            return stateClone;
        default:
            return state;
    }
};
