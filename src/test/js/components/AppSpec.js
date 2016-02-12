var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var App = require('components/App.js');
var MenuMock = Mocker("Menu");
var WorkspaceMock = Mocker("Workspace");
App.__set__('Menu', MenuMock);
App.__set__('Workspace', WorkspaceMock);

describe('App', function() {
    var loadWorkspaceSpy = jasmine.createSpy('loadWorkspace');

    var props = {
        settings: {},

        data: {
            workspace: {
                people: [],
                spaces: [
                    {
                        name: "Space1",
                        people: [
                            {
                                name: "George"
                            }
                        ]
                    }
                ]
            }
        },

        loadWorkspace: loadWorkspaceSpy,
        saveWorkspace: function(){},
        movePerson: function(){},
        createPerson: function(){},
        createSpace: function(){},
        deletePerson: function(){},

        enableMove: function(){},
        disableMove: function(){},
        setNewPersonModalOpen: function(){},
        setNewSpaceModalOpen: function(){}
    };

    var app;
    beforeEach(function() {
        app = RenderComponent(App, <App {...props} />);
    });

    it('calls the loadWorkspace action', function() {
        expect(loadWorkspaceSpy).toHaveBeenCalled();
    });

    it('has a configured Menu component as a child', function() {
        var menuComponent = ReactTestUtils.findRenderedComponentWithType(app, MenuMock);
        expect(menuComponent).toBeTruthy('No Menu component found');

        expect(menuComponent.props.settings).toBe(props.settings, "No settings passed to menu");
        expect(menuComponent.props.saveWorkspace).toBe(props.saveWorkspace, "No saveWorkspace passed to menu");
        expect(menuComponent.props.createPerson).toBe(props.createPerson, "No createPerson passed to menu");
        expect(menuComponent.props.createSpace).toBe(props.createSpace, "No createSpace passed to menu");

        expect(menuComponent.props.enableMove).toBe(props.enableMove, "No enableMove passed to menu");
        expect(menuComponent.props.disableMove).toBe(props.disableMove, "No disableMove passed to menu");
        expect(menuComponent.props.setNewPersonModalOpen).toBe(props.setNewPersonModalOpen, "No setNewPersonModalOpen passed to menu");
        expect(menuComponent.props.setNewSpaceModalOpen).toBe(props.setNewSpaceModalOpen, "No setNewSpaceModalOpen passed to menu");
    });

    it('has a configured Workspace component as a child', function() {
        var workspaceComponent = ReactTestUtils.findRenderedComponentWithType(app, WorkspaceMock);
        expect(workspaceComponent).toBeTruthy('No Menu component found');

        expect(workspaceComponent.props.spaces).toBe(props.data.workspace.spaces, "No spaces passed to workspace");
        expect(workspaceComponent.props.people).toBe(props.data.workspace.people, "No people passed to workspace");

        expect(workspaceComponent.props.movePerson).toBe(props.movePerson, "No movePerson passed to workspace");
        expect(workspaceComponent.props.deletePerson).toBe(props.deletePerson, "No deletePerson passed to workspace");
    });
});