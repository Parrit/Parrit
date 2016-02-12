var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var Workspace = require('components/Workspace.js');
var SpaceMock = Mocker("Space");
var PersonListMock = Mocker("PersonList");
Workspace.__set__('Space', SpaceMock);
Workspace.__set__('PersonList', PersonListMock);

describe('Workspace', function() {
    var movePersonSpy = jasmine.createSpy();
    var deletePersonSpy = jasmine.createSpy();

    var props = {
        people: [
            {name:"Mike Wazowski"},
            {name:"Sully"}
        ],
        spaces: [
            {
                name: "Space1",
                people: [
                    {
                        name: "George"
                    }
                ]
            },
            {
                name: "Ghost",
                people: [
                    {
                        name: "Coast2Coast"
                    }
                ]
            }
        ],
        movePerson: movePersonSpy,
        deletePerson: deletePersonSpy,
        deleteSpace: function(){}
    };

    var workspace;
    beforeEach(function() {
        workspace = RenderComponent(Workspace, <Workspace {...props} />);
    });

    it('renders all of the spaces in the workspace', function() {
        var spaces = ReactTestUtils.scryRenderedComponentsWithType(workspace, SpaceMock);
        expect(spaces.length).toBe(2, 'Not enough spaces');

        expect(spaces[0].props.name).toBe("Space1");
        expect(spaces[0].props.people).toEqual([{name:"George"}]);
        expect(spaces[0].props.index).toBe(0);
        expect(spaces[0].props.deleteSpace).toBe(props.deleteSpace);

        expect(spaces[1].props.name).toBe("Ghost");
        expect(spaces[1].props.people).toEqual([{name:"Coast2Coast"}]);
        expect(spaces[1].props.index).toBe(1);
        expect(spaces[1].props.deleteSpace).toBe(props.deleteSpace);
    });

    it('renders the list of people in the workspace', function() {
        var people = ReactTestUtils.findRenderedComponentWithType(workspace, PersonListMock);
        expect(people).toBeDefined('No list of people');
        expect(people.props.people).toBe(props.people);
        expect(people.props.index).toBe(-1);
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

            workspace.dropzoneOnDragEnter(event);

            expect(event.target.classList.add).toHaveBeenCalledWith('drop-target');
            expect(event.relatedTarget.classList.add).toHaveBeenCalledWith('can-drop');
        });

        it('sets toSpaceIndex to the result of getIndexFromId with the dropzone id', function() {
            spyOn(workspace, 'getIndexFromId').and.returnValue(5);

            workspace.dropzoneOnDragEnter(event);

            expect(workspace.getIndexFromId).toHaveBeenCalledWith("albert_5");
            expect(workspace.toSpaceIndex).toBe(5);
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

            workspace.dropzoneOnDragLeave(event);

            expect(event.target.classList.remove).toHaveBeenCalledWith('drop-target');
            expect(event.relatedTarget.classList.remove).toHaveBeenCalledWith('can-drop');
        });

        it('sets fromSpaceIndex to the result of getIndexFromId with the dropzone id if fromSpaceIndex is UNDEFINED', function() {
            spyOn(workspace, 'getIndexFromId').and.returnValue(5);

            workspace.dropzoneOnDragLeave(event);

            expect(workspace.getIndexFromId).toHaveBeenCalledWith("albert_5");
            expect(workspace.fromSpaceIndex).toBe(5);
        });

        it('DOES NOT set fromSpaceIndex to the result of getIndexFromId with the dropzone id if fromSpaceIndex is DEFINED', function() {
            spyOn(workspace, 'getIndexFromId').and.returnValue(5);
            workspace.fromSpaceIndex = 7;

            workspace.dropzoneOnDragLeave(event);

            expect(workspace.getIndexFromId).not.toHaveBeenCalledWith("albert_5");
            expect(workspace.fromSpaceIndex).toBe(7);
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

            workspace.dropzoneOnDrop(event);

            expect(event.target.classList.remove).toHaveBeenCalledWith('drop-target');
            expect(event.relatedTarget.classList.remove).toHaveBeenCalledWith('can-drop');
        });

        it('calls movePerson with workspace variables and the result of the getIndexFromId', function() {
            spyOn(workspace, 'getIndexFromId').and.returnValue(4);

            workspace.fromSpaceIndex = 3;
            workspace.toSpaceIndex = 9;

            workspace.dropzoneOnDrop(event);

            expect(workspace.getIndexFromId).toHaveBeenCalledWith('steve_8');
            expect(movePersonSpy).toHaveBeenCalledWith(3, 9, 4);
        });

        it('set fromSpaceIndex to toSpaceIndex if the fromSpaceIndex is UNDEFINED', function() {
            spyOn(workspace, 'getIndexFromId').and.returnValue(4);

            workspace.fromSpaceIndex = undefined;
            workspace.toSpaceIndex = 9;

            workspace.dropzoneOnDrop(event);

            expect(workspace.getIndexFromId).toHaveBeenCalledWith('steve_8');
            expect(movePersonSpy).toHaveBeenCalledWith(9, 9, 4);
        });

        it('sets the workspace variables to undefined', function() {
            spyOn(workspace, 'getIndexFromId').and.returnValue(4);

            workspace.fromSpaceIndex = 3;
            workspace.toSpaceIndex = 9;

            workspace.dropzoneOnDrop(event);

            expect(workspace.fromSpaceIndex).toBeUndefined();
            expect(workspace.toSpaceIndex).toBeUndefined();
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

            workspace.trashOnDrop(event);

            expect(event.target.classList.remove).toHaveBeenCalledWith('drop-target');
            expect(event.relatedTarget.classList.remove).toHaveBeenCalledWith('can-drop');
        });

        it('calls deletePerson with fromSpaceIndex and the result of the getIndexFromId', function() {
            spyOn(workspace, 'getIndexFromId').and.returnValue(4);

            workspace.fromSpaceIndex = 3;
            workspace.toSpaceIndex = 9;

            workspace.trashOnDrop(event);

            expect(workspace.getIndexFromId).toHaveBeenCalledWith('steve_8');
            expect(deletePersonSpy).toHaveBeenCalledWith(3, 4);
        });

        it('sets the workspace variables to undefined', function() {
            spyOn(workspace, 'getIndexFromId').and.returnValue(4);

            workspace.fromSpaceIndex = 3;
            workspace.toSpaceIndex = 9;

            workspace.trashOnDrop(event);

            expect(workspace.fromSpaceIndex).toBeUndefined();
            expect(workspace.toSpaceIndex).toBeUndefined();
        });
    });

    describe('#getIndexFromId', function() {
        it('returns the integer after the last underscore', function() {
            expect(workspace.getIndexFromId('happy_happy_32_joy_382')).toBe(382);
            expect(workspace.getIndexFromId('happy_happy_32_neg_-382')).toBe(-382);
        });

        it('returns -1 when the argument is undefined', function() {
            expect(workspace.getIndexFromId(undefined)).toBe(-1);
        });
    });
});