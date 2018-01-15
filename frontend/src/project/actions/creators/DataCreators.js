export function loadProjectCreator(project) {
    return {
        type: 'LOAD_PROJECT',
        project: project
    };
}

export function resetPairingBoardCreator() {
    return {
        type: 'RESET_PAIRING_BOARD'
    };
}

export function smartResetBoard() {
    return {
        type: 'SMART_RESET_BOARD'
    };
}

export function loadPairingHistoryCreator(pairingHistoryList) {
    return {
        type: 'LOAD_PAIRING_HISTORY',
        pairingHistoryList: pairingHistoryList
    };
}

export function updatePairingHistoriesCreator(newPairingHistories) {
    return {
        type: 'UPDATE_PAIRING_HISTORIES',
        newPairingHistories: newPairingHistories
    };
}
