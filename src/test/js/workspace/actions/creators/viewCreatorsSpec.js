var viewCreators = require('workspace/actions/creators/viewCreators.js');

describe('viewCreators', function () {
    describe('#setNewPersonModalOpen', function () {
        it('returns the right action type', function () {
            var action = viewCreators.setNewPersonModalOpen();
            expect(action.type).toBe('SET_NEW_PERSON_MODAL_OPEN');
        });

        it('sets the new person modal open to be the passed in value', function () {
            var action = viewCreators.setNewPersonModalOpen(true);
            expect(action.isOpen).toBe(true);
        });
    });

    describe('#setNewSpaceModalOpen', function () {
        it('returns the right action type', function () {
            var action = viewCreators.setNewSpaceModalOpen();
            expect(action.type).toBe('SET_NEW_SPACE_MODAL_OPEN');
        });

        it('sets the new person modal open to be the passed in value', function () {
            var action = viewCreators.setNewSpaceModalOpen(true);
            expect(action.isOpen).toBe(true);
        });
    });
});