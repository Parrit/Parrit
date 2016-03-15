export function movePersonCreator(fromSpaceIndex, toSpaceIndex, personIndex) {
    return {
        type: 'MOVE_PERSON',
        fromSpaceIndex: fromSpaceIndex,
        toSpaceIndex: toSpaceIndex,
        personIndex: personIndex
    };
}

export function createPersonCreator(name) {
    return {
        type: 'CREATE_PERSON',
        name: name
    };
}

export function createSpaceCreator(name) {
    return {
        type: 'CREATE_SPACE',
        name: name
    };
}

export function deletePersonCreator(spaceIndex, personIndex) {
    return {
        type: 'DELETE_PERSON',
        spaceIndex: spaceIndex,
        personIndex: personIndex
    };
}

export function deleteSpaceCreator(spaceIndex) {
    return {
        type: 'DELETE_SPACE',
        spaceIndex: spaceIndex
    };
}

export function loadWorkspaceCreator(workspace) {
    return {
        type: 'LOAD_WORKSPACE',
        workspace: workspace
    };
}

export function renameSpaceCreator(spaceIndex, newName) {
    return {
        type: 'RENAME_SPACE',
        spaceIndex: spaceIndex,
        name: newName
    }
}
