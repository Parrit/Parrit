import * as _ from 'lodash'

const initialState = {
    id: 0,
    people: [],
    pairingBoards: []
}

export default function (state = initialState, action) {
    let stateClone
    switch (action.type) {
        case 'LOAD_PROJECT':
            return action.project
        case 'RESET_PAIRING_BOARD':
            stateClone = _.cloneDeep(state)

            // forEach pairing board
            // take people array
            // set people array to []
            // take all people and append to "people"
            // unless the board is an exempt board
            stateClone.people = stateClone.people.concat(
                stateClone.pairingBoards.reduce(function (people, pairingBoard) {
                    if (pairingBoard.exempt) return people

                    people = people.concat(pairingBoard.people)
                    pairingBoard.people = []
                    return people
                }, [])
            )

            return stateClone
        case 'SMART_RESET_BOARD':
            stateClone = _.cloneDeep(state)

            // forEach pairing board
            // take people array
            // set people array to [<last-person>]
            // take all remaining people and append to "people"
            // unless the board is an exempt board
            stateClone.people = stateClone.people.concat(
                stateClone.pairingBoards.reduce(function (people, pairingBoard) {
                    if (pairingBoard.exempt) return people

                    while(pairingBoard.people.length > 1) {
                        people.push(pairingBoard.people.pop())
                    }

                    return people
                }, [])
            )

            return stateClone
        default:
            return state
    }
}
