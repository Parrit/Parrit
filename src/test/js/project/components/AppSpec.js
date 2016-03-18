var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var App = require('project/components/App.js');
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
            }
        },
        setNewPersonModalOpen: function(){},
        setNewPairingBoardModalOpen: function(){},
        setErrorType: function(){},
        createPerson: function(){},
        createPairingBoard: function(){},
        movePerson: jasmine.createSpy("movePersonSpy"),
        deletePerson: jasmine.createSpy("deletePersonSpy"),
        deletePairingBoard: function(){},
        renamePairingBoard: function(){}
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

        expect(projectComponent.props.savePairing).toBe(props.savePairing, 'No savePairing passed to project');
        expect(projectComponent.props.getRecommendedPairs).toBe(props.getRecommendedPairs, 'No getRecommendedPairs passed to project');

        expect(projectComponent.props.settings).toBe(props.settings, 'No pairingBoards passed to project');
        expect(projectComponent.props.data).toBe(props.data, 'No data passed to project');

        expect(projectComponent.props.setNewPersonModalOpen).toBe(props.setNewPersonModalOpen, 'No setNewPersonModalOpen passed to project');
        expect(projectComponent.props.setNewPairingBoardModalOpen).toBe(props.setNewPairingBoardModalOpen, 'No setNewPairingBoardModalOpen passed to project');
        expect(projectComponent.props.setErrorType).toBe(props.setErrorType, 'No setErrorType passed to project');
        expect(projectComponent.props.createPerson).toBe(props.createPerson, 'No createPerson passed to project');
        expect(projectComponent.props.createPairingBoard).toBe(props.createPairingBoard, 'No createPairingBoard passed to project');
        expect(projectComponent.props.deletePairingBoard).toBe(props.deletePairingBoard, 'No deletePairingBoard passed to project');
        expect(projectComponent.props.renamePairingBoard).toBe(props.renamePairingBoard, 'No renamePairingBoard passed to project');
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

        it('sets toPairingBoardIndex to the result of getIndexFromId with the dropzone id', function() {
            spyOn(app, 'getIndexFromId').and.returnValue(5);

            app.dropzoneOnDragEnter(event);

            expect(app.getIndexFromId).toHaveBeenCalledWith("albert_5");
            expect(app.toPairingBoardIndex).toBe(5);
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

        it('sets fromPairingBoardIndex to the result of getIndexFromId with the dropzone id if fromPairingBoardIndex is UNDEFINED', function() {
            spyOn(app, 'getIndexFromId').and.returnValue(5);

            app.dropzoneOnDragLeave(event);

            expect(app.getIndexFromId).toHaveBeenCalledWith("albert_5");
            expect(app.fromPairingBoardIndex).toBe(5);
        });

        it('DOES NOT set fromPairingBoardIndex to the result of getIndexFromId with the dropzone id if fromPairingBoardIndex is DEFINED', function() {
            spyOn(app, 'getIndexFromId').and.returnValue(5);
            app.fromPairingBoardIndex = 7;

            app.dropzoneOnDragLeave(event);

            expect(app.getIndexFromId).not.toHaveBeenCalledWith("albert_5");
            expect(app.fromPairingBoardIndex).toBe(7);
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

            app.fromPairingBoardIndex = 3;
            app.toPairingBoardIndex = 9;

            app.dropzoneOnDrop(event);

            expect(app.getIndexFromId).toHaveBeenCalledWith('steve_8');
            expect(props.movePerson).toHaveBeenCalledWith(3, 9, 4);
        });

        it('set fromPairingBoardIndex to toPairingBoardIndex if the fromPairingBoardIndex is UNDEFINED', function() {
            spyOn(app, 'getIndexFromId').and.returnValue(4);

            app.fromPairingBoardIndex = undefined;
            app.toPairingBoardIndex = 9;

            app.dropzoneOnDrop(event);

            expect(app.getIndexFromId).toHaveBeenCalledWith('steve_8');
            expect(props.movePerson).toHaveBeenCalledWith(9, 9, 4);
        });

        it('sets the app variables to undefined', function() {
            spyOn(app, 'getIndexFromId').and.returnValue(4);

            app.fromPairingBoardIndex = 3;
            app.toPairingBoardIndex = 9;

            app.dropzoneOnDrop(event);

            expect(app.fromPairingBoardIndex).toBeUndefined();
            expect(app.toPairingBoardIndex).toBeUndefined();
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

        it('calls deletePerson with fromPairingBoardIndex and the result of the getIndexFromId', function() {
            spyOn(app, 'getIndexFromId').and.returnValue(4);

            app.fromPairingBoardIndex = 3;
            app.toPairingBoardIndex = 9;

            app.trashOnDrop(event);

            expect(app.getIndexFromId).toHaveBeenCalledWith('steve_8');
            expect(props.deletePerson).toHaveBeenCalledWith(3, 4);
        });

        it('sets the app variables to undefined', function() {
            spyOn(app, 'getIndexFromId').and.returnValue(4);

            app.fromPairingBoardIndex = 3;
            app.toPairingBoardIndex = 9;

            app.trashOnDrop(event);

            expect(app.fromPairingBoardIndex).toBeUndefined();
            expect(app.toPairingBoardIndex).toBeUndefined();
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