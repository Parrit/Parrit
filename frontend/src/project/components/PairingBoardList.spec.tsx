import * as React from 'react'
import {PairingBoardList} from "./PairingBoardList";
import * as ShallowRenderer from 'react-test-renderer/shallow';

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
            }
        }

        const pairingBoards = [
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
        ]

        const renderer = ShallowRenderer.createRenderer();
        renderer.render(
            <PairingBoardList pairingBoards={pairingBoards}/>
        );
        wrapper = renderer.getRenderOutput();
    })

    it('renders all of the pairing boards and defaults editMode to false', () => {
        const pairingBoards = wrapper.props.children
        expect(pairingBoards.length).toBe(2)

        expect(pairingBoards[0].props.pairingBoard.id).toBe(1)
        expect(pairingBoards[0].props.pairingBoard.name).toBe('Cool Kids')
        expect(pairingBoards[0].props.pairingBoard.exempt).toBe(false)
        expect(pairingBoards[0].props.pairingBoard.people).toStrictEqual(props.pairingBoards[0].people)
        expect(pairingBoards[0].props.pairingBoard.roles).toStrictEqual(props.pairingBoards[0].roles)

        expect(pairingBoards[1].props.pairingBoard.id).toBe(2)
        expect(pairingBoards[1].props.pairingBoard.name).toBe('Lame Kids')
        expect(pairingBoards[1].props.pairingBoard.exempt).toBe(true)
        expect(pairingBoards[1].props.pairingBoard.people).toStrictEqual(props.pairingBoards[1].people)
        expect(pairingBoards[1].props.pairingBoard.roles).toStrictEqual(props.pairingBoards[1].roles)
    })
})
