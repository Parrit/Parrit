module.exports = {
    loadWorkspace: require('actions/dataActions.js').loadWorkspace,
    saveWorkspace: require('actions/dataActions.js').saveWorkspace,
    movePerson: require('actions/dataActions.js').movePerson,
    createPerson: require('actions/dataActions.js').createPerson,
    createSpace: require('actions/dataActions.js').createSpace,
    deletePerson: require('actions/dataActions.js').deletePerson,

    enableMove: require('actions/viewActions.js').enableMove,
    disableMove: require('actions/viewActions.js').disableMove,
    setNewPersonModalOpen: require('actions/viewActions.js').setNewPersonModalOpen,
    setNewSpaceModalOpen: require('actions/viewActions.js').setNewSpaceModalOpen
};
