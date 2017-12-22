import React from 'react';
import { shallow } from 'enzyme';

import Project from './Project.js';

describe('<Project/>', () => {
    let wrapper;

    const props = {
        getRecommendedPairs: () => {},
        savePairing: () => {},
        resetPairs: () => {},
        smartReset: () => {},

        settings: {},
        data: {
            project: {
                id: 77,
                name: 'The Best Around',
                people: [],
                pairingBoards: [
                    {
                        name: 'PairingBoard1',
                        people: [
                            {
                                name: 'George'
                            }
                        ]
                    }
                ]
            }
        },
        setNewPersonModalOpen: () => {},
        setNewPairingBoardModalOpen: () => {},
        createPerson: () => {},
        createPairingBoard: () => {},
        deletePairingBoard: () => {},
        renamePairingBoard: () => {}
    };

    beforeEach(() => {
        wrapper = shallow(<Project {...props} />);
    });

    it('displays the project name', () => {
        expect(wrapper.find('.project-name').text()).toBe('The Best Around');
    });

    it('has a reset pairs button', () => {
        const allButtons = wrapper.find('Button');
        const recommendPairsButton = allButtons.at(0);

        expect(recommendPairsButton.prop('className')).toBe('button-blue');
        expect(recommendPairsButton.prop('name')).toBe('Reset Pairs');
        expect(recommendPairsButton.prop('shortName')).toBe('Reset');
        expect(recommendPairsButton.prop('clickFunction')).toBe(props.resetPairs);
    });

    it('has a smart reset button', () => {
        const allButtons = wrapper.find('Button');
        const recommendPairsButton = allButtons.at(1);

        expect(recommendPairsButton.prop('className')).toBe('button-blue');
        expect(recommendPairsButton.prop('name')).toBe('Smart Reset');
        expect(recommendPairsButton.prop('shortName')).toBe('Smart');
        expect(recommendPairsButton.prop('clickFunction')).toBe(props.smartReset);
    });

    it('has a recommend pairs button', () => {
        const allButtons = wrapper.find('Button');
        const recommendPairsButton = allButtons.at(2);

        expect(recommendPairsButton.prop('className')).toBe('button-blue');
        expect(recommendPairsButton.prop('name')).toBe('Recommend Pairs');
        expect(recommendPairsButton.prop('shortName')).toBe('Recommend');
        expect(recommendPairsButton.prop('clickFunction')).toBe(props.getRecommendedPairs);
    });

    it('has a records pairs button', () => {
        const allButtons = wrapper.find('Button');
        const recordPairs = allButtons.at(3);

        expect(recordPairs.prop('className')).toBe('button-green');
        expect(recordPairs.prop('name')).toBe('Record Pairs');
        expect(recordPairs.prop('shortName')).toBe('Record');
        expect(recordPairs.prop('clickFunction')).toBe(props.savePairing);
    });

    it('has a configured Workspace component as a child', () => {
        const workspaceComponent = wrapper.find('Workspace');
        expect(workspaceComponent.exists()).toBeTruthy();

        expect(workspaceComponent.prop('projectId')).toBe(props.data.project.id, 'No projectId passed to project');
        expect(workspaceComponent.prop('settings')).toBe(props.settings, 'No pairingBoards passed to project');
        expect(workspaceComponent.prop('people')).toBe(props.data.project.people, 'No people passed to project');
        expect(workspaceComponent.prop('pairingBoards')).toBe(props.data.project.pairingBoards, 'No pairingBoards passed to project');

        expect(workspaceComponent.prop('setNewPersonModalOpen')).toBe(props.setNewPersonModalOpen, 'No setNewPersonModalOpen passed to project');
        expect(workspaceComponent.prop('setNewPairingBoardModalOpen')).toBe(props.setNewPairingBoardModalOpen, 'No setNewPairingBoardModalOpen passed to project');
        expect(workspaceComponent.prop('createPerson')).toBe(props.createPerson, 'No createPerson passed to project');
        expect(workspaceComponent.prop('createPairingBoard')).toBe(props.createPairingBoard, 'No createPairingBoard passed to project');

        expect(workspaceComponent.prop('deletePairingBoard')).toBe(props.deletePairingBoard, 'No deletePairingBoard passed to project');
        expect(workspaceComponent.prop('renamePairingBoard')).toBe(props.renamePairingBoard, 'No renamePairingBoard passed to project');
    });
});
