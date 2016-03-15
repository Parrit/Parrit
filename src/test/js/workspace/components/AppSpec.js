var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var App = require('workspace/components/App.js');
var HeaderMock = Mocker("Header");
var ProjectMock = Mocker("Project");
var FooterMock = Mocker("Footer");
App.__set__('Header', HeaderMock);
App.__set__('Project', ProjectMock);
App.__set__('Footer', FooterMock);

describe('App', function() {
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
        movePerson: jasmine.createSpy("movePersonSpy"),
        deletePerson: jasmine.createSpy("deletePersonSpy"),
        deleteSpace: function(){},
        renameSpace: function(){}
    };

    var app;
    beforeEach(function() {
        app = RenderComponent(App, <App {...props}/>);
    });

    it('has a Header', function() {
        var header = ReactTestUtils.findRenderedComponentWithType(app, HeaderMock);
        expect(header).toBeTruthy();
    });

    it('has a Project', function() {
        var projectComponent = ReactTestUtils.findRenderedComponentWithType(app, ProjectMock);
        expect(projectComponent).toBeTruthy('No Project component found');

        expect(projectComponent.props.savePairing).toBe(props.savePairing, 'No savePairing passed to workspace');
        expect(projectComponent.props.getRecommendedPairs).toBe(props.getRecommendedPairs, 'No getRecommendedPairs passed to workspace');

        expect(projectComponent.props.settings).toBe(props.settings, 'No spaces passed to workspace');
        expect(projectComponent.props.data).toBe(props.data, 'No data passed to workspace');

        expect(projectComponent.props.setNewPersonModalOpen).toBe(props.setNewPersonModalOpen, 'No setNewPersonModalOpen passed to workspace');
        expect(projectComponent.props.setNewSpaceModalOpen).toBe(props.setNewSpaceModalOpen, 'No setNewSpaceModalOpen passed to workspace');
        expect(projectComponent.props.createPerson).toBe(props.createPerson, 'No createPerson passed to workspace');
        expect(projectComponent.props.createSpace).toBe(props.createSpace, 'No createSpace passed to workspace');
        expect(projectComponent.props.deleteSpace).toBe(props.deleteSpace, 'No deleteSpace passed to workspace');
        expect(projectComponent.props.renameSpace).toBe(props.renameSpace, 'No renameSpace passed to workspace');
    });

    it('has a Footer', function() {
        var footer = ReactTestUtils.findRenderedComponentWithType(app, FooterMock);
        expect(footer).toBeTruthy();
    });

    describe('#dropzoneOnDragEnter', function() {
        var event;
        beforeEach(function() {
            event = {
                target: { id: "albert_5", classList: { add: function(){} } },
                relatedTarget: { classList: { add: function(){} } }
            };
        });

        it('adds correct classes to dropzone and draggable elements', function() {
            spyOn(event.target.classList, 'add');
            spyOn(event.relatedTarget.classList, 'add');

            app.dropzoneOnDragEnter(event);

            expect(event.target.classList.add).toHaveBeenCalledWith('drop-target');
            expect(event.relatedTarget.classList.add).toHaveBeenCalledWith('can-drop');
        });

        it('sets toSpaceIndex to the result of getIndexFromId with the dropzone id', function() {
            spyOn(app, 'getIndexFromId').and.returnValue(5);

            app.dropzoneOnDragEnter(event);

            expect(app.getIndexFromId).toHaveBeenCalledWith("albert_5");
            expect(app.toSpaceIndex).toBe(5);
        });
    });

    describe('#dropzoneOnDragLeave', function() {
        var event;
        beforeEach(function() {
            event = {
                target: { id: "albert_5", classList: { remove: function(){} } },
                relatedTarget: { classList: { remove: function(){} } }
            };
        });

        it('removes correct classes from dropzone and draggable elements', function() {
            spyOn(event.target.classList, 'remove');
            spyOn(event.relatedTarget.classList, 'remove');

            app.dropzoneOnDragLeave(event);

            expect(event.target.classList.remove).toHaveBeenCalledWith('drop-target');
            expect(event.relatedTarget.classList.remove).toHaveBeenCalledWith('can-drop');
        });

        it('sets fromSpaceIndex to the result of getIndexFromId with the dropzone id if fromSpaceIndex is UNDEFINED', function() {
            spyOn(app, 'getIndexFromId').and.returnValue(5);

            app.dropzoneOnDragLeave(event);

            expect(app.getIndexFromId).toHaveBeenCalledWith("albert_5");
            expect(app.fromSpaceIndex).toBe(5);
        });

        it('DOES NOT set fromSpaceIndex to the result of getIndexFromId with the dropzone id if fromSpaceIndex is DEFINED', function() {
            spyOn(app, 'getIndexFromId').and.returnValue(5);
            app.fromSpaceIndex = 7;

            app.dropzoneOnDragLeave(event);

            expect(app.getIndexFromId).not.toHaveBeenCalledWith("albert_5");
            expect(app.fromSpaceIndex).toBe(7);
        });
    });

    describe('#dropzoneOnDrop', function() {
        var event;
        beforeEach(function() {
            event = {
                target: { id: "albert_5", classList: { remove: function(){} } },
                relatedTarget: { id: "steve_8", classList: { remove: function(){} } }
            };
        });

        it('removes correct classes from dropzone and draggable elements', function() {
            spyOn(event.target.classList, 'remove');
            spyOn(event.relatedTarget.classList, 'remove');

            app.dropzoneOnDrop(event);

            expect(event.target.classList.remove).toHaveBeenCalledWith('drop-target');
            expect(event.relatedTarget.classList.remove).toHaveBeenCalledWith('can-drop');
        });

        it('calls movePerson with app variables and the result of the getIndexFromId', function() {
            spyOn(app, 'getIndexFromId').and.returnValue(4);

            app.fromSpaceIndex = 3;
            app.toSpaceIndex = 9;

            app.dropzoneOnDrop(event);

            expect(app.getIndexFromId).toHaveBeenCalledWith('steve_8');
            expect(props.movePerson).toHaveBeenCalledWith(3, 9, 4);
        });

        it('set fromSpaceIndex to toSpaceIndex if the fromSpaceIndex is UNDEFINED', function() {
            spyOn(app, 'getIndexFromId').and.returnValue(4);

            app.fromSpaceIndex = undefined;
            app.toSpaceIndex = 9;

            app.dropzoneOnDrop(event);

            expect(app.getIndexFromId).toHaveBeenCalledWith('steve_8');
            expect(props.movePerson).toHaveBeenCalledWith(9, 9, 4);
        });

        it('sets the app variables to undefined', function() {
            spyOn(app, 'getIndexFromId').and.returnValue(4);

            app.fromSpaceIndex = 3;
            app.toSpaceIndex = 9;

            app.dropzoneOnDrop(event);

            expect(app.fromSpaceIndex).toBeUndefined();
            expect(app.toSpaceIndex).toBeUndefined();
        });
    });

    describe('#trashOnDrop', function() {
        var event;
        beforeEach(function() {
            event = {
                target: { id: "albert_5", classList: { remove: function(){} } },
                relatedTarget: { id: "steve_8", classList: { remove: function(){} } }
            };
        });

        it('removes correct classes from dropzone and draggable elements', function() {
            spyOn(event.target.classList, 'remove');
            spyOn(event.relatedTarget.classList, 'remove');

            app.trashOnDrop(event);

            expect(event.target.classList.remove).toHaveBeenCalledWith('drop-target');
            expect(event.relatedTarget.classList.remove).toHaveBeenCalledWith('can-drop');
        });

        it('calls deletePerson with fromSpaceIndex and the result of the getIndexFromId', function() {
            spyOn(app, 'getIndexFromId').and.returnValue(4);

            app.fromSpaceIndex = 3;
            app.toSpaceIndex = 9;

            app.trashOnDrop(event);

            expect(app.getIndexFromId).toHaveBeenCalledWith('steve_8');
            expect(props.deletePerson).toHaveBeenCalledWith(3, 4);
        });

        it('sets the app variables to undefined', function() {
            spyOn(app, 'getIndexFromId').and.returnValue(4);

            app.fromSpaceIndex = 3;
            app.toSpaceIndex = 9;

            app.trashOnDrop(event);

            expect(app.fromSpaceIndex).toBeUndefined();
            expect(app.toSpaceIndex).toBeUndefined();
        });
    });

    describe('#getIndexFromId', function() {
        it('returns the integer after the last underscore', function() {
            expect(app.getIndexFromId('happy_happy_32_joy_382')).toBe(382);
            expect(app.getIndexFromId('happy_happy_32_neg_-382')).toBe(-382);
        });

        it('returns -1 when the argument is undefined', function() {
            expect(app.getIndexFromId(undefined)).toBe(-1);
        });
    });
});