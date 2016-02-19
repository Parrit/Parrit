function setNewPersonModalOpen(isOpen) {
    return {
        type: 'SET_NEW_PERSON_MODAL_OPEN',
        isOpen: isOpen
    }
}

function setNewSpaceModalOpen(isOpen) {
    return {
        type: 'SET_NEW_SPACE_MODAL_OPEN',
        isOpen: isOpen
    }
}

module.exports = {
    setNewPersonModalOpen: setNewPersonModalOpen,
    setNewSpaceModalOpen: setNewSpaceModalOpen
};
