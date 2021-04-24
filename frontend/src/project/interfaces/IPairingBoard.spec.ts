import {add} from "./IPairingBoard";

describe('pairing board', () => {
    it('should add person', () => {
        const initialBoard = {
            id: 1,
            name: 'board1',
            exempt: true,
            people: [{id: 1, name: 'Pam'}],
            roles: []
        }
        const expectedBoard = {
            id: 1,
            name: 'board1',
            exempt: true,
            people: [{id: 1, name: 'Pam'}, {id: 2, name: 'Jim'}],
            roles: []
        }
        const actual = add({id: 2, name: 'Jim'}, initialBoard)

        expect(actual).toEqual(expectedBoard);
    })
})