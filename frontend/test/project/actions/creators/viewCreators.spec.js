import * as viewCreators from 'project/actions/creators/viewCreators.js';

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

    describe('#setNewPairingBoardModalOpenCreator', function () {
        it('returns the right action type', function () {
            var action = viewCreators.setNewPairingBoardModalOpenCreator();
            expect(action.type).toBe('SET_NEW_PAIRING_BOARD_MODAL_OPEN');
        });

        it('sets the new person modal open to be the passed in value', function () {
            var action = viewCreators.setNewPairingBoardModalOpenCreator(true);
            expect(action.isOpen).toBe(true);
        });
    });

    describe('#setPairingHistoryPanelOpenCreator', function () {
        it('returns the right action type', function () {
            var action = viewCreators.setPairingHistoryPanelOpenCreator();
            expect(action.type).toBe('SET_PAIRING_HISTORY_PANEL_OPEN');
        });

        it('sets the new person modal open to be the passed in value', function () {
            var action = viewCreators.setPairingHistoryPanelOpenCreator(true);
            expect(action.isOpen).toBe(true);
        });
    });

    describe('#setErrorTypeCreator', function () {
        it('returns the right action type', function () {
            var action = viewCreators.setErrorTypeCreator();
            expect(action.type).toBe('SET_ERROR_TYPE');
        });

        it('sets the new person modal open to be the passed in value', function () {
            var action = viewCreators.setErrorTypeCreator(401);
            expect(action.errorType).toBe(401);
        });
    });
});