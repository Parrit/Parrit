function enableMoveCreator() {
    return {
        type: 'SET_MOVE',
        canMove: true
    };
}

function disableMoveCreator() {
    return {
        type: 'SET_MOVE',
        canMove: false
    };
}

function setNewPersonModalOpenCreator(isOpen) {
    return {
        type: 'SET_NEW_PERSON_MODAL_OPEN',
        isOpen: isOpen
    }
}

function setNewSpaceModalOpenCreator(isOpen) {
    return {
        type: 'SET_NEW_SPACE_MODAL_OPEN',
        isOpen: isOpen
    }
}

module.exports = {
    enableMove: enableMoveCreator,
    disableMove: disableMoveCreator,
    setNewPersonModalOpen: setNewPersonModalOpenCreator,
    setNewSpaceModalOpen: setNewSpaceModalOpenCreator
};
