var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var Project = require('project/components/Project.js');
var ButtonMock = Mocker('Button');
var WorkspaceMock = Mocker('Workspace');
Project.__set__('Button', ButtonMock);
Project.__set__('Workspace', WorkspaceMock);

describe('Project', function() {
    var props = {
        getRecommendedPairs: function(){},
        savePairing: function(){},
        resetPairs: function(){},

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
        setNewPersonModalOpen: function(){},
        setNewPairingBoardModalOpen: function(){},
        setErrorType: function(){},
        createPerson: function(){},
        createPairingBoard: function(){},
        deletePairingBoard: function(){},
        renamePairingBoard: function(){}
    };

    var project;
    beforeEach(function() {
        project = RenderComponent(Project, <Project {...props} />);
    });

    it('displays the project name', function() {
        var projectName = ReactTestUtils.findRenderedDOMComponentWithClass(project, 'project-name');
        expect(projectName.innerHTML).toBe('The Best Around');
    });

    it('has a reset pairs button', function() {
        var allButtons = ReactTestUtils.scryRenderedComponentsWithType(project, ButtonMock);
        var recommendPairsButton = allButtons[0];

        expect(recommendPairsButton.props.className).toBe('button-blue');
        expect(recommendPairsButton.props.name).toBe('Reset Pairs');
        expect(recommendPairsButton.props.shortName).toBe('Reset');
        expect(recommendPairsButton.props.clickFunction).toBe(props.resetPairs);
    });
    it('has a recommend pairs button', function() {
        var allButtons = ReactTestUtils.scryRenderedComponentsWithType(project, ButtonMock);
        var recommendPairsButton = allButtons[1];

        expect(recommendPairsButton.props.className).toBe('button-blue');
        expect(recommendPairsButton.props.name).toBe('Recommend Pairs');
        expect(recommendPairsButton.props.shortName).toBe('Recommend');
        expect(recommendPairsButton.props.clickFunction).toBe(props.getRecommendedPairs);
    });

    it('has a records pairs button', function() {
        var allButtons = ReactTestUtils.scryRenderedComponentsWithType(project, ButtonMock);
        var recordPairs = allButtons[2];

        expect(recordPairs.props.className).toBe('button-green');
        expect(recordPairs.props.name).toBe('Record Pairs');
        expect(recordPairs.props.shortName).toBe('Record');
        expect(recordPairs.props.clickFunction).toBe(props.savePairing);
    });

    it('has a configured Workspace component as a child', function() {
        var workspaceComponent = ReactTestUtils.findRenderedComponentWithType(project, WorkspaceMock);
        expect(workspaceComponent).toBeTruthy('No Menu component found');

        expect(workspaceComponent.props.projectId).toBe(props.data.project.id, 'No projectId passed to project');
        expect(workspaceComponent.props.settings).toBe(props.settings, 'No pairingBoards passed to project');
        expect(workspaceComponent.props.people).toBe(props.data.project.people, 'No people passed to project');
        expect(workspaceComponent.props.pairingBoards).toBe(props.data.project.pairingBoards, 'No pairingBoards passed to project');

        expect(workspaceComponent.props.setNewPersonModalOpen).toBe(props.setNewPersonModalOpen, 'No setNewPersonModalOpen passed to project');
        expect(workspaceComponent.props.setNewPairingBoardModalOpen).toBe(props.setNewPairingBoardModalOpen, 'No setNewPairingBoardModalOpen passed to project');
        expect(workspaceComponent.props.setErrorType).toBe(props.setErrorType, 'No setErrorType passed to project');
        expect(workspaceComponent.props.createPerson).toBe(props.createPerson, 'No createPerson passed to project');
        expect(workspaceComponent.props.createPairingBoard).toBe(props.createPairingBoard, 'No createPairingBoard passed to project');

        expect(workspaceComponent.props.deletePairingBoard).toBe(props.deletePairingBoard, 'No deletePairingBoard passed to project');
        expect(workspaceComponent.props.renamePairingBoard).toBe(props.renamePairingBoard, 'No renamePairingBoard passed to project');
    });
});