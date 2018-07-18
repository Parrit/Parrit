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

export function setNewRoleModalOpenCreator(pairingBoardId, isOpen) {
    return {
        type: 'SET_NEW_ROLE_MODAL_OPEN',
        pairingBoardId: pairingBoardId,
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

export function setNewRoleModalErrorMessageCreator(errorResponse) {
    return {
        type: 'SET_NEW_ROLE_MODAL_ERROR_MESSAGE',
        errorResponse: errorResponse
    }
}

export function setPairingBoardEditErrorMessageCreator(pairingBoardId, errorResponse) {
    return {
        type: 'SET_PAIRING_BOARD_EDIT_ERROR_MESSAGE',
        pairingBoardId: pairingBoardId,
        errorResponse: errorResponse
    }
}

export function clearPairingBoardEditErrorMessageCreator(pairingBoardId) {
    return {
        type: 'CLEAR_PAIRING_BOARD_EDIT_ERROR_MESSAGE',
        pairingBoardId: pairingBoardId
    }
}

export function setPairingBoardEditModeCreator(pairingBoardId, editMode) {
    return {
        type: 'SET_PAIRING_BOARD_EDIT_MODE',
        pairingBoardId: pairingBoardId,
        editMode: editMode
    }
}

export function setSystemAlertMessage(message) {
    return {
        type: 'SET_SYSTEM_ALERT_MESSAGE',
        message: message
    }
}

export function clearSystemAlertMessage() {
    return {
        type: 'CLEAR_SYSTEM_ALERT_MESSAGE'
    }
}