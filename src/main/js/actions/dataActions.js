var dataThunks = require('actions/thunks/dataThunks.js');

function movePerson(fromSpaceIndex, toSpaceIndex, personIndex) {
    return dataThunks.autoSaveThunk({
        type: 'MOVE_PERSON',
        fromSpaceIndex: fromSpaceIndex,
        toSpaceIndex: toSpaceIndex,
        personIndex: personIndex
    });
}

function createPerson(name) {
    return dataThunks.autoSaveThunk({
        type: 'CREATE_PERSON',
        name: name
    })
}

function createSpace(name) {
    return dataThunks.autoSaveThunk({
        type: 'CREATE_SPACE',
        name: name
    });
}

function deletePerson(spaceIndex, personIndex) {
    return dataThunks.autoSaveThunk({
        type: 'DELETE_PERSON',
        spaceIndex: spaceIndex,
        personIndex: personIndex
    });
}

function deleteSpace(spaceIndex) {
    return dataThunks.autoSaveThunk({
        type: 'DELETE_SPACE',
        spaceIndex: spaceIndex
    });
}

module.exports = {
    movePerson: movePerson,
    createPerson: createPerson,
    createSpace: createSpace,
    deletePerson: deletePerson,
    deleteSpace: deleteSpace
};