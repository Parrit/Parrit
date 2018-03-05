import React from 'react'
import { shallow } from 'enzyme'

import App from './App.js'

describe('<App/>', () => {
    let wrapper, props
    const InnerApp = App.DecoratedComponent

    beforeEach(() => {
        props = {
            data: {
                project: {
                    name: 'The Best Around',
                    people: [],
                    pairingBoards: [
                        {
                            name: 'PairingBoard1',
                            people: [
                                {
                                    name: 'George'
                                }
                            ],
                            roles: []
                        }
                    ]
                },
                pairingHistory: {
                    pairingHistoryList: [{data: 'blah'}]
                }
            },
            settings: {
                pairingHistoryPanel: {
                    isOpen: true
                }
            },
            createPerson: () => {},
            movePerson: () => {},
            deletePerson: () => {},
            createPairingBoard: () => {},
            renamePairingBoard: () => {},
            deletePairingBoard: () => {},
            createRole: () => {},
            moveRole: () => {},
            deleteRole: () => {},
            resetPairs: () => {},
            smartReset: () => {},
            getRecommendedPairs: () => {},
            savePairing: () => {},
            fetchPairingHistory: () => {},
            setNewPersonModalOpen: () => {},
            setNewPairingBoardModalOpen: () => {},
            setNewRoleModalOpen: () => {},
            setPairingBoardEditMode: () => {},
            setPairingHistoryPanelOpen: () => {},
            postLogout: () => {},
            connectDropTarget: jasmine.createSpy('connectDropTargetSpy')
        }

        props.connectDropTarget.and.callFake(i => i)

        wrapper = shallow(<InnerApp {...props}/>)
    })

    it('adds the shift-left class on itself if isPairingHistoryPanelOpen is true', () => {
        expect(wrapper.find('.shift-left').exists()).toBeTruthy()
    })

    it('has a Header component', () => {
        const headerComponent = wrapper.find('Header')
        expect(headerComponent.exists()).toBeTruthy()

        expect(headerComponent.prop('setPairingHistoryPanelOpen')).toBe(props.setPairingHistoryPanelOpen)
        expect(headerComponent.prop('isPairingHistoryPanelOpen')).toBe(props.settings.pairingHistoryPanel.isOpen)
    })

    it('has a Project component', () => {
        const projectComponent = wrapper.find('Project')
        expect(projectComponent.exists()).toBeTruthy()

        expect(projectComponent.prop('data')).toBe(props.data)
        expect(projectComponent.prop('settings')).toBe(props.settings)
        expect(projectComponent.prop('createPerson')).toBe(props.createPerson)
        expect(projectComponent.prop('movePerson')).toBe(props.movePerson)
        expect(projectComponent.prop('deletePerson')).toBe(props.deletePerson)
        expect(projectComponent.prop('createPairingBoard')).toBe(props.createPairingBoard)
        expect(projectComponent.prop('renamePairingBoard')).toBe(props.renamePairingBoard)
        expect(projectComponent.prop('deletePairingBoard')).toBe(props.deletePairingBoard)
        expect(projectComponent.prop('createRole')).toBe(props.createRole)
        expect(projectComponent.prop('moveRole')).toBe(props.moveRole)
        expect(projectComponent.prop('deleteRole')).toBe(props.deleteRole)
        expect(projectComponent.prop('resetPairs')).toBe(props.resetPairs)
        expect(projectComponent.prop('smartReset')).toBe(props.smartReset)
        expect(projectComponent.prop('getRecommendedPairs')).toBe(props.getRecommendedPairs)
        expect(projectComponent.prop('savePairing')).toBe(props.savePairing)
        expect(projectComponent.prop('setNewPersonModalOpen')).toBe(props.setNewPersonModalOpen)
        expect(projectComponent.prop('setNewPairingBoardModalOpen')).toBe(props.setNewPairingBoardModalOpen)
        expect(projectComponent.prop('setNewRoleModalOpen')).toBe(props.setNewRoleModalOpen)
        expect(projectComponent.prop('setPairingBoardEditMode')).toBe(props.setPairingBoardEditMode)
    })

    it('has a Footer component', () => {
        const footerComponent = wrapper.find('Footer')
        expect(footerComponent.exists()).toBeTruthy()
    })

    it('has a PairingHistory component', () => {
        const pairingHistoryComponent = wrapper.find('PairingHistory')
        expect(pairingHistoryComponent.exists()).toBeTruthy()

        expect(pairingHistoryComponent.prop('pairingHistoryList')).toBe(props.data.pairingHistory.pairingHistoryList)
        expect(pairingHistoryComponent.prop('fetchPairingHistory')).toBe(props.fetchPairingHistory)
        expect(pairingHistoryComponent.prop('setPairingHistoryPanelOpen')).toBe(props.setPairingHistoryPanelOpen)
        expect(pairingHistoryComponent.prop('isPairingHistoryPanelOpen')).toBe(props.settings.pairingHistoryPanel.isOpen)
    })
})
