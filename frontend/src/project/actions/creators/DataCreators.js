export function loadProjectCreator(project) {
    return {
        type: 'LOAD_PROJECT',
        project: project
    };
}

export function movePersonCreator(fromPairingBoardIndex, toPairingBoardIndex, personIndex) {
    return {
        type: 'MOVE_PERSON',
        fromPairingBoardIndex: fromPairingBoardIndex,
        toPairingBoardIndex: toPairingBoardIndex,
        personIndex: personIndex
    };
}

export function deletePersonCreator(pairingBoardIndex, personIndex) {
    return {
        type: 'DELETE_PERSON',
        pairingBoardIndex: pairingBoardIndex,
        personIndex: personIndex
    };
}

export function deletePairingBoardCreator(pairingBoardIndex) {
    return {
        type: 'DELETE_PAIRING_BOARD',
        pairingBoardIndex: pairingBoardIndex
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
