function enableMove() {
    return { type: 'SET_MOVE', canMove: true };
}

function disableMove() {
    return { type: 'SET_MOVE', canMove: false };
}

module.exports = {
    enableMove: enableMove,
    disableMove: disableMove
}
