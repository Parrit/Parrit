export function movePersonCreator(fromPairingBoardIndex, toPairingBoardIndex, personIndex) {
    return {
        type: 'MOVE_PERSON',
        fromPairingBoardIndex: fromPairingBoardIndex,
        toPairingBoardIndex: toPairingBoardIndex,
        personIndex: personIndex
    };
}

export function createPersonCreator(name) {
    return {
        type: 'CREATE_PERSON',
        name: name
    };
}

export function createPairingBoardCreator(name) {
    return {
        type: 'CREATE_PAIRING_BOARD',
        name: name
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

export function loadProjectCreator(project) {
    return {
        type: 'LOAD_PROJECT',
        project: project
    };
}

export function renamePairingBoardCreator(pairingBoardIndex, newName) {
    return {
        type: 'RENAME_PAIRING_BOARD',
        pairingBoardIndex: pairingBoardIndex,
        name: newName
    }
}
