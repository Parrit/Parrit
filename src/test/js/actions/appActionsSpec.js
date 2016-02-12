var appActions = require('actions/appActions.js');

describe('appActions', function () {
    beforeEach(function () {
        jasmine.Ajax.install();
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    describe('#loadWorkspace', function () {
        var action;
        beforeEach(function () {
            action = appActions.loadWorkspace();
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
            action = appActions.saveWorkspace();
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

    describe('#enableMove', function () {
        it('returns the right action type', function () {
            var action = appActions.enableMove();
            expect(action.type).toBe('SET_MOVE');
        });
    });

    describe('#disableMove', function () {
        it('returns the right action type', function () {
            var action = appActions.disableMove();
            expect(action.type).toBe('SET_MOVE');
        });
    });

    describe('#createPerson', function () {
        it('returns the right action type', function () {
            var action = appActions.createPerson();
            expect(action.type).toBe('CREATE_PERSON');
        });

        it('sets name equal to the passed in value', function () {
            var action = appActions.createPerson('Forrest Gump');
            expect(action.name).toBe('Forrest Gump');
        });
    });

    describe('#createSpace', function() {
        it('returns the right action type', function () {
            var action = appActions.createSpace();
            expect(action.type).toBe('CREATE_SPACE');
        });

        it('sets name equal to the passed in value', function () {
            var action = appActions.createSpace('A Bus Bench');
            expect(action.name).toBe('A Bus Bench');
        });
    });

    describe('#setNewPersonModalOpen', function () {
        it('returns the right action type', function () {
            var action = appActions.setNewPersonModalOpen();
            expect(action.type).toBe('SET_NEW_PERSON_MODAL_OPEN');
        });

        it('sets the new person modal open to be the passed in value', function () {
            var action = appActions.setNewPersonModalOpen(true);
            expect(action.isOpen).toBe(true);
        });
    });

    describe('#setNewSpaceModalOpen', function () {
        it('returns the right action type', function () {
            var action = appActions.setNewSpaceModalOpen();
            expect(action.type).toBe('SET_NEW_SPACE_MODAL_OPEN');
        });

        it('sets the new person modal open to be the passed in value', function () {
            var action = appActions.setNewSpaceModalOpen(true);
            expect(action.isOpen).toBe(true);
        });
    });
});