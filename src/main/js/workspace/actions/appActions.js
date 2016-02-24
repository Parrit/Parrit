var dataCreators = require('workspace/actions/creators/dataCreators.js');
var viewCreators = require('workspace/actions/creators/viewCreators.js');
var dataThunks = require('workspace/actions/thunks/dataThunks.js');

function movePersonCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.movePersonCreator(...args));
}

function createPersonCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.createPersonCreator(...args));
}

function createSpaceCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.createSpaceCreator(...args));
}

function deletePersonCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.deletePersonCreator(...args));
}

function deleteSpaceCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.deleteSpaceCreator(...args));
}

module.exports = {
    movePerson: movePersonCombo,
    createPerson: createPersonCombo,
    createSpace: createSpaceCombo,
    deletePerson: deletePersonCombo,
    deleteSpace: deleteSpaceCombo,
    setNewPersonModalOpen: viewCreators.setNewPersonModalOpenCreator,
    setNewSpaceModalOpen: viewCreators.setNewSpaceModalOpenCreator
};

