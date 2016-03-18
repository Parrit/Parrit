export function setNewPersonModalOpenCreator(isOpen) {
    return {
        type: 'SET_NEW_PERSON_MODAL_OPEN',
        isOpen: isOpen
    }
}

export function setNewPairingBoardModalOpenCreator(isOpen) {
    return {
        type: 'SET_NEW_PAIRING_BOARD_MODAL_OPEN',
        isOpen: isOpen
    }
}

export function setErrorTypeCreator(errorStatus) {
    return {
        type: 'SET_ERROR_TYPE',
        errorType: errorStatus
    }
}
