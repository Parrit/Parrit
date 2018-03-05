import React from 'react'
import { shallow } from 'enzyme'

import PairingBoardList from './PairingBoardList.js'
import PairingBoard from './PairingBoard.js'

describe('<PairingBoardList/>', () => {
    let wrapper, props

    beforeEach(() => {
        props = {
            pairingBoards: [
                {
                    id: 1,
                    name: 'Cool Kids',
                    exempt: false,
                    people: [
                        {
                            id: 7,
                            name: 'George'
                        },
                        {
                            id: 88,
                            name: 'Hank Muchacho'
                        }
                    ],
                    roles: ['Ballers']
                },
                {
                    id: 2,
                    name: 'Lame Kids',
                    exempt: true,
                    people: [],
                    roles: []
                }
            ],
            pairingBoardSettings: {
                1: {
                    editMode: true,
                    editErrorMessage: 'some error message'
                }
            },
            renamePairingBoard: () => {},
            deletePairingBoard: () => {},
            movePerson: () => {},
            deletePerson: () => {},
            moveRole: () => {},
            deleteRole: () => {},
            setNewRoleModalOpen: () => {},
            setPairingBoardEditMode: () => {}
        }

        wrapper = shallow(<PairingBoardList {...props} />)
    })

    it('renders all of the pairing boards and defaults editMode to false', () => {
        const pairingBoards = wrapper.find(PairingBoard)
        expect(pairingBoards.length).toBe(2)

        expect(pairingBoards.at(0).prop('id')).toBe(1)
        expect(pairingBoards.at(0).prop('name')).toBe('Cool Kids')
        expect(pairingBoards.at(0).prop('exempt')).toBe(false)
        expect(pairingBoards.at(0).prop('people')).toBe(props.pairingBoards[0].people)
        expect(pairingBoards.at(0).prop('roles')).toBe(props.pairingBoards[0].roles)
        expect(pairingBoards.at(0).prop('editMode')).toBe(true)
        expect(pairingBoards.at(0).prop('editErrorMessage')).toBe('some error message')
        expect(pairingBoards.at(0).prop('renamePairingBoard')).toBe(props.renamePairingBoard)
        expect(pairingBoards.at(0).prop('deletePairingBoard')).toBe(props.deletePairingBoard)
        expect(pairingBoards.at(0).prop('deletePerson')).toBe(props.deletePerson)
        expect(pairingBoards.at(0).prop('movePerson')).toBe(props.movePerson)
        expect(pairingBoards.at(0).prop('moveRole')).toBe(props.moveRole)
        expect(pairingBoards.at(0).prop('deleteRole')).toBe(props.deleteRole)
        expect(pairingBoards.at(0).prop('setNewRoleModalOpen')).toBe(props.setNewRoleModalOpen)
        expect(pairingBoards.at(0).prop('setPairingBoardEditMode')).toBe(props.setPairingBoardEditMode)

        expect(pairingBoards.at(1).prop('id')).toBe(2)
        expect(pairingBoards.at(1).prop('name')).toBe('Lame Kids')
        expect(pairingBoards.at(1).prop('exempt')).toBe(true)
        expect(pairingBoards.at(1).prop('people')).toBe(props.pairingBoards[1].people)
        expect(pairingBoards.at(1).prop('roles')).toBe(props.pairingBoards[1].roles)
        expect(pairingBoards.at(1).prop('editMode')).toBe(false)
        expect(pairingBoards.at(1).prop('editErrorMessage')).toBe(undefined)
        expect(pairingBoards.at(1).prop('renamePairingBoard')).toBe(props.renamePairingBoard)
        expect(pairingBoards.at(1).prop('deletePairingBoard')).toBe(props.deletePairingBoard)
        expect(pairingBoards.at(1).prop('movePerson')).toBe(props.movePerson)
        expect(pairingBoards.at(1).prop('deletePerson')).toBe(props.deletePerson)
        expect(pairingBoards.at(1).prop('moveRole')).toBe(props.moveRole)
        expect(pairingBoards.at(1).prop('deleteRole')).toBe(props.deleteRole)
        expect(pairingBoards.at(1).prop('setNewRoleModalOpen')).toBe(props.setNewRoleModalOpen)
        expect(pairingBoards.at(1).prop('setPairingBoardEditMode')).toBe(props.setPairingBoardEditMode)
    })
})
