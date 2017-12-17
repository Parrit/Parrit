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

export function setPairingHistoryPanelOpenCreator(isOpen) {
    return {
        type: 'SET_PAIRING_HISTORY_PANEL_OPEN',
        isOpen: isOpen
    }
}

export function setNewPersonModalErrorMessageCreator(errorResponse) {
    return {
        type: 'SET_NEW_PERSON_MODAL_ERROR_MESSAGE',
        errorResponse: errorResponse
    }
}

export function setNewPairingBoardModalErrorMessageCreator(errorResponse) {
    return {
        type: 'SET_NEW_PAIRING_BOARD_MODAL_ERROR_MESSAGE',
        errorResponse: errorResponse
    }
}

export function setEditPairingBoardErrorMessageCreator(pairingBoardId, errorResponse) {
    return {
        type: 'SET_EDIT_PAIRING_BOARD_ERROR_MESSAGE',
        pairingBoardId: pairingBoardId,
        errorResponse: errorResponse
    }
}

export function clearEditPairingBoardErrorMessageCreator(pairingBoardId) {
    return {
        type: 'CLEAR_EDIT_PAIRING_BOARD_ERROR_MESSAGE',
        pairingBoardId: pairingBoardId
    }
}