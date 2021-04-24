import * as React from 'react'
import {Project} from "./Project";
import {Workspace} from "./Workspace";
import {ProjectContext} from "../ProjectContext";
import * as TestRenderer from 'react-test-renderer';
import {Button} from "../../shared/components/Button";

describe('<Project/>', () => {
    let wrapper;
    const props = {
        project: {
            id: 1,
            pairingBoards: [],
            people:[],
            name: 'The Best Around'
        },
        resetPairs: jest.fn(),
        getRecommendedPairs: jest.fn(),
        savePairing: jest.fn(),
        people: [],
        pairingHistory:[],
        createPerson: jest.fn(),
        createPairingBoard: jest.fn(),
        createRole: jest.fn(),
        movePerson: jest.fn(),
        moveRole: jest.fn(),
        destroyPerson: jest.fn(),
        destroyRole: jest.fn(),
        destroyPairingBoard: jest.fn(),
        projectId: 1
    }

    beforeEach(() => {
        wrapper = TestRenderer.create(
            <ProjectContext.Provider value={props}>
                <Project/>
            </ProjectContext.Provider>
        ).root;
    })

    it('displays the project name', () => {
        expect(wrapper.findByType("h1").props.children).toBe('The Best Around');
    })

    it('has a reset pairs button', () => {
        const allButtons = wrapper.findAllByType(Button)
        const recommendPairsButton = allButtons[0];

        expect(recommendPairsButton.props.className).toBe('button-blue')
        expect(recommendPairsButton.props.name).toBe('Reset Pairs')
        expect(recommendPairsButton.props.shortName).toBe('Reset')
        expect(recommendPairsButton.props.clickFunction).toBe(props.resetPairs)
    })

    it('has a recommend pairs button', () => {
        const allButtons = wrapper.findAllByType(Button)
        const recommendPairsButton = allButtons[1]

        expect(recommendPairsButton.props.className).toBe('button-blue')
        expect(recommendPairsButton.props.name).toBe('Recommend Pairs')
        expect(recommendPairsButton.props.shortName).toBe('Recommend')
        expect(recommendPairsButton.props.clickFunction).toBe(props.getRecommendedPairs)
    })

    it('has a records pairs button', () => {
        const allButtons = wrapper.findAllByType(Button)
        const recordPairs = allButtons[2]

        expect(recordPairs.props.className).toBe('button-green')
        expect(recordPairs.props.name).toBe('Record Pairs')
        expect(recordPairs.props.shortName).toBe('Record')
        expect(recordPairs.props.clickFunction).toBe(props.savePairing)
    })

    it('has a Workspace component as a child', () => {
        const workspaceComponent = wrapper.findByType(Workspace)
        expect(workspaceComponent).toBeTruthy()
    })
})
