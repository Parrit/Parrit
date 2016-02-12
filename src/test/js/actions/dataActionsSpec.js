var dataActions = require('actions/dataActions.js');

describe('dataActions', function () {
    beforeEach(function () {
        jasmine.Ajax.install();
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    describe('#loadWorkspace', function () {
        var action;
        beforeEach(function () {
            action = dataActions.loadWorkspace();
        });

        it('returns a function', function () {
            expect(typeof action).toBe('function');
        });

        describe('when calling the returned function', function () {
            var stubbedGet;
            var dispatchSpy;
            beforeEach(function () {
                stubbedGet = jasmine.Ajax.stubRequest('/workspace?id=1', undefined, 'GET');
                dispatchSpy = jasmine.createSpy('LoadWorkspaceDispatchSpy');

                action(dispatchSpy);
            });

            it('makes an Ajax call to get the workspace for id 1', function (done) {
                setTimeout(function () {
                    expect(jasmine.Ajax.requests.count()).toBe(1);
                    expect(jasmine.Ajax.requests.mostRecent().url).toBe('/workspace?id=1');
                    expect(jasmine.Ajax.requests.mostRecent().method).toBe('GET');
                    done();
                });
            });

            describe('when the Ajax call returns with a NON-NULL response', function () {
                var responseText = {iamaproperty: "blahblah"};
                beforeEach(function () {
                    stubbedGet.andReturn({responseText: responseText});
                });

                it('dispatches a LOAD_WORKSPACE action with the response', function (done) {
                    setTimeout(function () {
                        expect(dispatchSpy).toHaveBeenCalledWith({type: 'LOAD_WORKSPACE', workspace: responseText});
                        done();
                    });
                });
            });

            describe('when the Ajax call returns with a NULL response', function () {
                beforeEach(function () {
                    stubbedGet.andReturn({responseText: null});
                });

                it('SHOULD NOT dispatch a LOAD_WORKSPACE action with the response', function (done) {
                    setTimeout(function () {
                        expect(dispatchSpy).not.toHaveBeenCalled();
                        done();
                    });
                });
            });
        });
    });

    describe('#saveWorkspace', function () {
        var action;
        beforeEach(function () {
            action = dataActions.saveWorkspace();
        });

        it('returns a function', function () {
            expect(typeof action).toBe('function');
        });

        describe('when calling the returned function', function () {
            var stubbedPost;
            var dispatchSpy;
            var workspaceToSave = {MISSISSIPPI: "Anthony is more fun than that"};
            var stateOfApp = {data: {workspace: workspaceToSave}};
            beforeEach(function () {
                stubbedPost = jasmine.Ajax.stubRequest('/workspace', undefined, 'POST');
                dispatchSpy = jasmine.createSpy('SaveWorkspaceDispatchSpy');

                action(dispatchSpy, function () {
                    return stateOfApp
                });
            });

            it('makes an Ajax call to post the workspace', function (done) {
                setTimeout(function () {
                    expect(jasmine.Ajax.requests.count()).toBe(1);
                    expect(jasmine.Ajax.requests.mostRecent().url).toBe('/workspace');
                    expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
                    expect(jasmine.Ajax.requests.mostRecent().data()).toEqual(workspaceToSave);
                    done();
                });
            });

            describe('when the Ajax call returns with a NONNULL response', function () {
                var responseText = {iamaproperty: "blahblah"};
                beforeEach(function () {
                    stubbedPost.andReturn({responseText: responseText});
                });

                it('dispatches a LOAD_WORKSPACE action with the response', function (done) {
                    setTimeout(function () {
                        expect(dispatchSpy).toHaveBeenCalledWith({type: 'LOAD_WORKSPACE', workspace: responseText});
                        done();
                    });
                });
            });

            describe('when the Ajax call returns with a NULL response', function () {
                beforeEach(function () {
                    stubbedPost.andReturn({responseText: null});
                });

                it('SHOULD NOT dispatch a LOAD_WORKSPACE action with the response', function (done) {
                    setTimeout(function () {
                        expect(dispatchSpy).not.toHaveBeenCalled();
                        done();
                    });
                });
            });
        });
    });

    describe('#movePerson', function () {
        it('returns the right action type', function () {
            var action = dataActions.movePerson();
            expect(action.type).toBe('MOVE_PERSON');
        });

        it('sets indexes correctly to the passed in values', function () {
            var action = dataActions.movePerson(1, 2, 3);
            expect(action.fromSpaceIndex).toBe(1);
            expect(action.toSpaceIndex).toBe(2);
            expect(action.personIndex).toBe(3);
        });
    });

    describe('#createPerson', function () {
        it('returns the right action type', function () {
            var action = dataActions.createPerson();
            expect(action.type).toBe('CREATE_PERSON');
        });

        it('sets name equal to the passed in value', function () {
            var action = dataActions.createPerson('Forrest Gump');
            expect(action.name).toBe('Forrest Gump');
        });
    });

    describe('#createSpace', function() {
        it('returns the right action type', function () {
            var action = dataActions.createSpace();
            expect(action.type).toBe('CREATE_SPACE');
        });

        it('sets name equal to the passed in value', function () {
            var action = dataActions.createSpace('A Bus Bench');
            expect(action.name).toBe('A Bus Bench');
        });
    });

    describe('#deletePerson', function() {
        it('returns the right action type', function () {
            var action = dataActions.deletePerson();
            expect(action.type).toBe('DELETE_PERSON');
        });

        it('sets indexes correctly to the passed in values', function () {
            var action = dataActions.deletePerson(1, 2);
            expect(action.spaceIndex).toBe(1);
            expect(action.personIndex).toBe(2);
        });
    })
});