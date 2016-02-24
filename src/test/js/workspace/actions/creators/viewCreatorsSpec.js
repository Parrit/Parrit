var viewCreators = require('workspace/actions/creators/viewCreators.js');

describe('viewCreators', function () {
    describe('#setNewPersonModalOpenCreator', function () {
        it('returns the right action type', function () {
            var action = viewCreators.setNewPersonModalOpenCreator();
            expect(action.type).toBe('SET_NEW_PERSON_MODAL_OPEN');
        });

        it('sets the new person modal open to be the passed in value', function () {
            var action = viewCreators.setNewPersonModalOpenCreator(true);
            expect(action.isOpen).toBe(true);
        });
    });

    describe('#setNewSpaceModalOpenCreator', function () {
        it('returns the right action type', function () {
            var action = viewCreators.setNewSpaceModalOpenCreator();
            expect(action.type).toBe('SET_NEW_SPACE_MODAL_OPEN');
        });

        it('sets the new person modal open to be the passed in value', function () {
            var action = viewCreators.setNewSpaceModalOpenCreator(true);
            expect(action.isOpen).toBe(true);
        });
    });
});