var dashboardThunks = require('dashboard/actions/thunks/dashboardThunks.js');

describe('dashboardThunks', function () {
    var thunk;
    var dispatchSpy;
    var postNewWorkspaceAndDoSpy;
    var postLoginAndRedirectSpy;
    beforeEach(function setup() {
        dispatchSpy = jasmine.createSpy('dispatchSpy');
        postNewWorkspaceAndDoSpy = jasmine.createSpy('postNewWorkspaceAndDoSpy');
        postLoginAndRedirectSpy = jasmine.createSpy('postLoginAndRedirectSpy');

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
            dashboardThunks.loginThunk("New Workspace", "S3cr3tP@$$w0rd");
        });

        it('calls postLoginAndRedirect with the name and password', function () {
            expect(postLoginAndRedirectSpy).toHaveBeenCalledWith("New Workspace", "S3cr3tP@$$w0rd");
        });
    })
});
