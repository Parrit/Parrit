var viewActions = require('actions/viewActions.js');

describe('viewActions', function () {
    describe('#setNewPersonModalOpen', function () {
        it('returns the right action type', function () {
            var action = viewActions.setNewPersonModalOpen();
            expect(action.type).toBe('SET_NEW_PERSON_MODAL_OPEN');
        });

        it('sets the new person modal open to be the passed in value', function () {
            var action = viewActions.setNewPersonModalOpen(true);
            expect(action.isOpen).toBe(true);
        });
    });

    describe('#setNewSpaceModalOpen', function () {
        it('returns the right action type', function () {
            var action = viewActions.setNewSpaceModalOpen();
            expect(action.type).toBe('SET_NEW_SPACE_MODAL_OPEN');
        });

        it('sets the new person modal open to be the passed in value', function () {
            var action = viewActions.setNewSpaceModalOpen(true);
            expect(action.isOpen).toBe(true);
        });
    });
});