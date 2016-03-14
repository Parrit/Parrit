var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var Project = require('workspace/components/Project.js');
var PrimaryButtonMock = Mocker('PrimaryButton');
var WorkspaceMock = Mocker('Workspace');
Project.__set__('PrimaryButton', PrimaryButtonMock);
Project.__set__('Workspace', WorkspaceMock);

describe('Project', function() {
    var props = {
        getRecommendedPairs: function(){},
        savePairing: function(){},

        settings: {},
        data: {
            workspace: {
                name: 'The Best Around',
                people: [],
                spaces: [
                    {
                        name: 'Space1',
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
        setNewSpaceModalOpen: function(){},
        createPerson: function(){},
        createSpace: function(){},
        deleteSpace: function(){}
    };

    var project;
    beforeEach(function() {
        project = RenderComponent(Project, <Project {...props} />);
    });

    it('displays the project name', function() {
        var workspaceName = ReactTestUtils.findRenderedDOMComponentWithClass(project, 'project-name');
        expect(workspaceName.innerHTML).toBe('The Best Around');
    });

    it('has a recommend pairs button', function() {
        var allButtons = ReactTestUtils.scryRenderedComponentsWithType(project, PrimaryButtonMock);
        var recommendPairsButton = allButtons[0];

        expect(recommendPairsButton.props.name).toBe('Recommend Pairs');
        expect(recommendPairsButton.props.shortName).toBe('Recommend');
        expect(recommendPairsButton.props.clickFunction).toBe(props.getRecommendedPairs);
    });

    it('has a records pairs button', function() {
        var allButtons = ReactTestUtils.scryRenderedComponentsWithType(project, PrimaryButtonMock);
        var recordPairs = allButtons[1];

        expect(recordPairs.props.name).toBe('Record Pairs');
        expect(recordPairs.props.shortName).toBe('Record');
        expect(recordPairs.props.clickFunction).toBe(props.savePairing);
    });

    it('has a configured Workspace component as a child', function() {
        var workspaceComponent = ReactTestUtils.findRenderedComponentWithType(project, WorkspaceMock);
        expect(workspaceComponent).toBeTruthy('No Menu component found');

        expect(workspaceComponent.props.settings).toBe(props.settings, 'No spaces passed to workspace');
        expect(workspaceComponent.props.people).toBe(props.data.workspace.people, 'No people passed to workspace');
        expect(workspaceComponent.props.spaces).toBe(props.data.workspace.spaces, 'No spaces passed to workspace');

        expect(workspaceComponent.props.setNewPersonModalOpen).toBe(props.setNewPersonModalOpen, 'No setNewPersonModalOpen passed to workspace');
        expect(workspaceComponent.props.setNewSpaceModalOpen).toBe(props.setNewSpaceModalOpen, 'No setNewSpaceModalOpen passed to workspace');
        expect(workspaceComponent.props.createPerson).toBe(props.createPerson, 'No createPerson passed to workspace');
        expect(workspaceComponent.props.createSpace).toBe(props.createSpace, 'No createSpace passed to workspace');

        expect(workspaceComponent.props.deleteSpace).toBe(props.deleteSpace, 'No deleteSpace passed to workspace');
    });
});