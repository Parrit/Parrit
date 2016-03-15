var dashboardThunks = require('dashboard/actions/thunks/dashboardThunks.js');

describe('dashboardThunks', function () {
    var thunk;
    var dispatchSpy;
    var getStateSpy;
    var setLoginErrorCreatorSpy;
    var postNewWorkspaceAndDoSpy;
    var postLoginAndRedirectSpy;
    beforeEach(function setup() {
        dispatchSpy = jasmine.createSpy('dispatchSpy');
        getStateSpy = jasmine.createSpy('getStateSpy');
        setLoginErrorCreatorSpy = jasmine.createSpy('setLoginErrorCreatorSpy');
        postNewWorkspaceAndDoSpy = jasmine.createSpy('postNewWorkspaceAndDoSpy');
        postLoginAndRedirectSpy = jasmine.createSpy('postLoginAndRedirectSpy');

        dashboardThunks.__set__('setLoginErrorCreator', setLoginErrorCreatorSpy);
        dashboardThunks.__set__('postNewWorkspaceAndDo', postNewWorkspaceAndDoSpy);
        dashboardThunks.__set__('postLoginAndRedirect', postLoginAndRedirectSpy);
    });

    describe('#createWorkspaceThunk', function () {
        beforeEach(function () {
            dashboardThunks.createWorkspaceThunk("New Workspace", "S3cr3tP@$$w0rd");
        });

        it('calls postNewWorkspaceAndDo helper with correct arguments', function () {
            expect(postNewWorkspaceAndDoSpy).toHaveBeenCalledWith("New Workspace", "S3cr3tP@$$w0rd", jasmine.anything());
        });

        it('passes in a callback that will call the postLoginAndRedirect with the name and password', function () {
            var callback = postNewWorkspaceAndDoSpy.calls.mostRecent().args[2];
            callback();

            expect(postLoginAndRedirectSpy).toHaveBeenCalledWith("New Workspace", "S3cr3tP@$$w0rd");
        });
    });

    describe('#loginThunk', function () {
        beforeEach(function () {
            thunk = dashboardThunks.loginThunk("New Workspace", "S3cr3tP@$$w0rd");
        });

        it('returns a function', function() {
            expect(typeof thunk).toBe('function');
        });

        describe('when calling the returned function', function() {

            beforeEach(function () {
                setLoginErrorCreatorSpy.and.returnValue({type: 'SET_LOGIN_ERROR'});

                thunk(dispatchSpy, getStateSpy);
            });

            it('calls postLoginAndRedirect with the name, password and an error callback', function () {
                expect(postLoginAndRedirectSpy).toHaveBeenCalledWith("New Workspace", "S3cr3tP@$$w0rd", jasmine.anything());
            });

            it('passes in a callback that will dispatch a setLoginError action', function() {
                var callback = postLoginAndRedirectSpy.calls.mostRecent().args[2];
                callback("ERROR");

                expect(setLoginErrorCreatorSpy).toHaveBeenCalledWith("ERROR");
                expect(dispatchSpy).toHaveBeenCalledWith({type: 'SET_LOGIN_ERROR'});
            });
        });
    })
});