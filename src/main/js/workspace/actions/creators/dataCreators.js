var dataThunks = require('workspace/actions/thunks/dataThunks.js');

export function movePerson(fromSpaceIndex, toSpaceIndex, personIndex) {
    return dataThunks.autoSaveThunk({
        type: 'MOVE_PERSON',
        fromSpaceIndex: fromSpaceIndex,
        toSpaceIndex: toSpaceIndex,
        personIndex: personIndex
    });
}

export function createPerson(name) {
    return dataThunks.autoSaveThunk({
        type: 'CREATE_PERSON',
        name: name
    })
}

export function createSpace(name) {
    return dataThunks.autoSaveThunk({
        type: 'CREATE_SPACE',
        name: name
    });
}

export function deletePerson(spaceIndex, personIndex) {
    return dataThunks.autoSaveThunk({
        type: 'DELETE_PERSON',
        spaceIndex: spaceIndex,
        personIndex: personIndex
    });
}

export function deleteSpace(spaceIndex) {
    return dataThunks.autoSaveThunk({
        type: 'DELETE_SPACE',
        spaceIndex: spaceIndex
    });
}
