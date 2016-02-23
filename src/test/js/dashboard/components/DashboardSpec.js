var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var Dashboard = require('dashboard/components/Dashboard.js');
var PrimaryButtonMock = Mocker("Button1");
var ModalMock = Mocker("Modal");
var NameFormMock = Mocker("NameForm");
Dashboard.__set__('PrimaryButton', PrimaryButtonMock);
Dashboard.__set__('Modal', ModalMock);
Dashboard.__set__('NameForm', NameFormMock);

describe('Dashboard', function() {
    var props;
    var dashboard;
    var newWorkspaceModal;
    var newWorkspaceForm;
    beforeEach(function() {
        props = {
            workspaceNames: ["Deathstar", "Chuck-e-Cheese"],
            isNewWorkspaceModalOpen: false,
            setNewWorkspaceModalOpen: jasmine.createSpy('newWorkspaceModalSpy'),
            createWorkspace: jasmine.createSpy('createWorkspaceSpy')
        };

        dashboard = RenderComponent(Dashboard, <Dashboard {...props} />);

        newWorkspaceModal = ReactTestUtils.findRenderedComponentWithType(dashboard, ModalMock);
        newWorkspaceForm = ReactTestUtils.findRenderedComponentWithType(newWorkspaceModal, NameFormMock);
    });

    it('has link tags with hrefs to the workspaces', function() {
        var workspaceLinks = ReactTestUtils.scryRenderedDOMComponentsWithTag(dashboard, 'a');
        expect(workspaceLinks[0].getAttribute('href')).toBe("/Deathstar");
        expect(workspaceLinks[1].getAttribute('href')).toBe('/Chuck-e-Cheese');
    });

    describe('newWorkspaceModal', function() {
        it('has a configured newWorkspaceModal component as a child', function() {
            expect(newWorkspaceModal.props.onRequestClose).toBe(dashboard.closeNewWorkspaceModal);
        });

        it('has a configured new workspace form in a modal', function() {
            expect(newWorkspaceForm.props.confirmFunction).toBe(dashboard.createWorkspaceWithName);
            expect(newWorkspaceForm.props.cancelFunction).toBe(dashboard.closeNewWorkspaceModal);
        });

        describe('#openNewWorkspaceModal', function() {
            it('shows the modal', function() {
                dashboard.openNewWorkspaceModal();
                expect(props.setNewWorkspaceModalOpen).toHaveBeenCalledWith(true);
            });
        });

        describe('#createWorkspaceWithName', function() {
            it('should call the createWorkspace action with the passed in name', function() {
                dashboard.createWorkspaceWithName('Alaska');
                expect(props.createWorkspace).toHaveBeenCalledWith('Alaska');
            });

            it('should close the modal', function() {
                dashboard.createWorkspaceWithName('Alaska');
                expect(props.setNewWorkspaceModalOpen).toHaveBeenCalledWith(false);
            });
        });
    });
});