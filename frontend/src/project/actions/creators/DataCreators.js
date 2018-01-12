export function loadProjectCreator(project) {
    return {
        type: 'LOAD_PROJECT',
        project: project
    };
}

export function moveAssignmentCreator(fromPairingBoardIndex, toPairingBoardIndex, assignmentIndex, assignmentType) {
    return {
        type: 'MOVE_ASSIGMENT',
        fromPairingBoardIndex: fromPairingBoardIndex,
        toPairingBoardIndex: toPairingBoardIndex,
        assignmentIndex: assignmentIndex,
        assignmentType: assignmentType
    };
}

export function deleteAssignmentCreator(pairingBoardIndex, assignmentIndex, assignmentType) {
    return {
        type: 'DELETE_ASSIGNMENT',
        pairingBoardIndex: pairingBoardIndex,
        assignmentIndex: assignmentIndex,
        assignmentType: assignmentType
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
