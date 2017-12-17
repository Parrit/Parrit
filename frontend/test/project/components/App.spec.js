import React from 'react';
import { shallow } from 'enzyme';

import App from 'project/components/App.js';

describe('<App/>', () => {
    let wrapper;

    const props = {
        getRecommendedPairs: () => {},
        savePairing: () => {},
        resetPairs: () => {},
        smartReset: () => {},

        settings: {
            pairingHistoryPanel: {
                isOpen: true
            }
        },
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
                        ]
                    }
                ]
            },
            pairingHistory: {
                pairingHistoryList: [{data: 'blah'}]
            }
        },
        setNewPersonModalOpen: () => {},
        setNewPairingBoardModalOpen: () => {},
        setPairingHistoryPanelOpen: () => {},
        createPerson: () => {},
        createPairingBoard: () => {},
        movePerson: jasmine.createSpy("movePersonSpy"),
        deletePerson: jasmine.createSpy("deletePersonSpy"),
        deletePairingBoard: () => {},
        renamePairingBoard: () => {},
        fetchPairingHistory: () => {},
        postLogout: () => {}
    };

    beforeEach(() => {
        wrapper = shallow(<App {...props}/>);
    });

    it('adds the shift-left class on itself if isPairingHistoryPanelOpen is true', () => {
        expect(wrapper.find('.shift-left').exists()).toBeTruthy();
    });

    it('has a Header component', () => {
        const headerComponent = wrapper.find('Header');
        expect(headerComponent.exists()).toBeTruthy();

        expect(headerComponent.prop('setPairingHistoryPanelOpen')).toBe(props.setPairingHistoryPanelOpen, 'No setPairingHistoryPanelOpen passed to header');
        expect(headerComponent.prop('isPairingHistoryPanelOpen')).toBe(props.settings.pairingHistoryPanel.isOpen, 'No isPairingHistoryPanelOpen passed to header');
    });

    it('has a Project component', () => {
        const projectComponent = wrapper.find('Project');
        expect(projectComponent.exists()).toBeTruthy();

        expect(projectComponent.prop('savePairing')).toBe(props.savePairing, 'No savePairing passed to project');
        expect(projectComponent.prop('getRecommendedPairs')).toBe(props.getRecommendedPairs, 'No getRecommendedPairs passed to project');

        expect(projectComponent.prop('settings')).toBe(props.settings, 'No pairingBoards passed to project');
        expect(projectComponent.prop('data')).toBe(props.data, 'No data passed to project');

        expect(projectComponent.prop('setNewPersonModalOpen')).toBe(props.setNewPersonModalOpen, 'No setNewPersonModalOpen passed to project');
        expect(projectComponent.prop('setNewPairingBoardModalOpen')).toBe(props.setNewPairingBoardModalOpen, 'No setNewPairingBoardModalOpen passed to project');
        expect(projectComponent.prop('createPerson')).toBe(props.createPerson, 'No createPerson passed to project');
        expect(projectComponent.prop('createPairingBoard')).toBe(props.createPairingBoard, 'No createPairingBoard passed to project');
        expect(projectComponent.prop('deletePairingBoard')).toBe(props.deletePairingBoard, 'No deletePairingBoard passed to project');
        expect(projectComponent.prop('renamePairingBoard')).toBe(props.renamePairingBoard, 'No renamePairingBoard passed to project');
    });

    it('has a Footer component', () => {
        expect(wrapper.find('Footer').exists()).toBeTruthy();
    });

    it('has a PairingHistory component', () => {
        const pairingHistoryComponent = wrapper.find('PairingHistory');
        expect(pairingHistoryComponent.exists()).toBeTruthy();

        expect(pairingHistoryComponent.prop('projectId')).toBe(props.data.project.id, 'No projectId passed to pairingHistory');
        expect(pairingHistoryComponent.prop('pairingHistoryList')).toBe(props.data.pairingHistory.pairingHistoryList, 'No pairingHistoryList passed to pairingHistory');
        expect(pairingHistoryComponent.prop('fetchPairingHistory')).toBe(props.fetchPairingHistory, 'No fetchPairingHistory passed to pairingHistory');
        expect(pairingHistoryComponent.prop('setPairingHistoryPanelOpen')).toBe(props.setPairingHistoryPanelOpen, 'No setPairingHistoryPanelOpen passed to pairingHistory');
        expect(pairingHistoryComponent.prop('isPairingHistoryPanelOpen')).toBe(props.settings.pairingHistoryPanel.isOpen, 'No isPairingHistoryPanelOpen passed to pairingHistory');
    });

    describe('#dropzoneOnDragEnter', () => {
        let event;

        beforeEach(() => {
            event = {
                target: { id: "albert_5", classList: { add: () => {} } },
                relatedTarget: { classList: { add: () => {} } }
            };
        });

        it('adds correct classes to dropzone and draggable elements', () => {
            spyOn(event.target.classList, 'add');
            spyOn(event.relatedTarget.classList, 'add');

            wrapper.instance().dropzoneOnDragEnter(event);

            expect(event.target.classList.add).toHaveBeenCalledWith('drop-target');
            expect(event.relatedTarget.classList.add).toHaveBeenCalledWith('can-drop');
        });

        it('sets toPairingBoardIndex to the result of getIndexFromId with the dropzone id', () => {
            spyOn(wrapper.instance(), 'getIndexFromId').and.returnValue(5);

            wrapper.instance().dropzoneOnDragEnter(event);

            expect(wrapper.instance().getIndexFromId).toHaveBeenCalledWith("albert_5");
            expect(wrapper.state('toPairingBoardIndex')).toBe(5);
        });
    });

    describe('#dropzoneOnDragLeave', () => {
        let event;

        beforeEach(() => {
            event = {
                target: { id: "albert_5", classList: { remove: () => {} } },
                relatedTarget: { classList: { remove: () => {} } }
            };
        });

        it('removes correct classes from dropzone and draggable elements', () => {
            spyOn(event.target.classList, 'remove');
            spyOn(event.relatedTarget.classList, 'remove');

            wrapper.instance().dropzoneOnDragLeave(event);

            expect(event.target.classList.remove).toHaveBeenCalledWith('drop-target');
            expect(event.relatedTarget.classList.remove).toHaveBeenCalledWith('can-drop');
        });

        it('sets fromPairingBoardIndex to the result of getIndexFromId with the dropzone id if fromPairingBoardIndex is UNDEFINED', () => {
            spyOn(wrapper.instance(), 'getIndexFromId').and.returnValue(5);

            wrapper.instance().dropzoneOnDragLeave(event);

            expect(wrapper.instance().getIndexFromId).toHaveBeenCalledWith("albert_5");
            expect(wrapper.state('fromPairingBoardIndex')).toBe(5);
        });

        it('DOES NOT set fromPairingBoardIndex to the result of getIndexFromId with the dropzone id if fromPairingBoardIndex is DEFINED', () => {
            spyOn(wrapper.instance(), 'getIndexFromId').and.returnValue(5);
            wrapper.setState({fromPairingBoardIndex: 7});

            wrapper.instance().dropzoneOnDragLeave(event);

            expect(wrapper.instance().getIndexFromId).not.toHaveBeenCalledWith("albert_5");
            expect(wrapper.state('fromPairingBoardIndex')).toBe(7);
        });
    });

    describe('#dropzoneOnDrop', () => {
        let event;

        beforeEach(() => {
            event = {
                target: { id: "albert_5", classList: { remove: () => {} } },
                relatedTarget: { id: "steve_8", classList: { remove: () => {} } }
            };
        });

        it('removes correct classes from dropzone and draggable elements', () => {
            spyOn(event.target.classList, 'remove');
            spyOn(event.relatedTarget.classList, 'remove');

            wrapper.instance().dropzoneOnDrop(event);

            expect(event.target.classList.remove).toHaveBeenCalledWith('drop-target');
            expect(event.relatedTarget.classList.remove).toHaveBeenCalledWith('can-drop');
        });

        it('calls movePerson with app variables and the result of the getIndexFromId', () => {
            spyOn(wrapper.instance(), 'getIndexFromId').and.returnValue(4);

            wrapper.setState({fromPairingBoardIndex: 3});
            wrapper.setState({toPairingBoardIndex: 9});

            wrapper.instance().dropzoneOnDrop(event);

            expect(wrapper.instance().getIndexFromId).toHaveBeenCalledWith('steve_8');
            expect(props.movePerson).toHaveBeenCalledWith(3, 9, 4);
        });

        it('set fromPairingBoardIndex to toPairingBoardIndex if the fromPairingBoardIndex is UNDEFINED', () => {
            spyOn(wrapper.instance(), 'getIndexFromId').and.returnValue(4);

            wrapper.setState({fromPairingBoardIndex: undefined});
            wrapper.setState({toPairingBoardIndex: 9});

            wrapper.instance().dropzoneOnDrop(event);

            expect(wrapper.instance().getIndexFromId).toHaveBeenCalledWith('steve_8');
            expect(props.movePerson).toHaveBeenCalledWith(9, 9, 4);
        });

        it('sets the app variables to undefined', () => {
            spyOn(wrapper.instance(), 'getIndexFromId').and.returnValue(4);

            wrapper.setState({fromPairingBoardIndex: 3});
            wrapper.setState({toPairingBoardIndex: 9});

            wrapper.instance().dropzoneOnDrop(event);

            expect(wrapper.state('fromPairingBoardIndex')).toBeUndefined();
            expect(wrapper.state('toPairingBoardIndex')).toBeUndefined();
        });
    });

    describe('#trashOnDrop', () => {
        let event;

        beforeEach(() => {
            event = {
                target: { id: "albert_5", classList: { remove: () => {} } },
                relatedTarget: { id: "steve_8", classList: { remove: () => {} } }
            };
        });

        it('removes correct classes from dropzone and draggable elements', () => {
            spyOn(event.target.classList, 'remove');
            spyOn(event.relatedTarget.classList, 'remove');

            wrapper.instance().trashOnDrop(event);

            expect(event.target.classList.remove).toHaveBeenCalledWith('drop-target');
            expect(event.relatedTarget.classList.remove).toHaveBeenCalledWith('can-drop');
        });

        it('calls deletePerson with fromPairingBoardIndex and the result of the getIndexFromId', () => {
            spyOn(wrapper.instance(), 'getIndexFromId').and.returnValue(4);

            wrapper.setState({fromPairingBoardIndex: 3});
            wrapper.setState({toPairingBoardIndex: 9});

            wrapper.instance().trashOnDrop(event);

            expect(wrapper.instance().getIndexFromId).toHaveBeenCalledWith('steve_8');
            expect(props.deletePerson).toHaveBeenCalledWith(3, 4);
        });

        it('sets the app variables to undefined', () => {
            spyOn(wrapper.instance(), 'getIndexFromId').and.returnValue(4);

            wrapper.setState({fromPairingBoardIndex: 3});
            wrapper.setState({toPairingBoardIndex: 9});

            wrapper.instance().trashOnDrop(event);

            expect(wrapper.state('fromPairingBoardIndex')).toBeUndefined();
            expect(wrapper.state('toPairingBoardIndex')).toBeUndefined();
        });
    });

    describe('#getIndexFromId', () => {
        it('returns the integer after the last underscore', () => {
            expect(wrapper.instance().getIndexFromId('happy_happy_32_joy_382')).toBe(382);
            expect(wrapper.instance().getIndexFromId('happy_happy_32_neg_-382')).toBe(-382);
        });

        it('returns -1 when the argument is undefined', () => {
            expect(wrapper.instance().getIndexFromId(undefined)).toBe(-1);
        });
    });
});
