import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import classNames from 'classnames';

class PairingBoardHeader extends React.Component {
    render() {
        const {name, exempt, editMode, editErrorMessage} = this.props;

        let pairingBoardNameSection;

        if (editMode) {
            const nameInputClasses = classNames({
                'editing-pairing-board-name': true,
                'error': editErrorMessage != undefined
            });

            pairingBoardNameSection = (
                <div className="pairing-board-name-wrapper">
                    <input className={nameInputClasses} autoFocus defaultValue={name}
                        onBlur={this.renamePairingBoard.bind(this)} onKeyDown={this.onKeyDownHandler.bind(this)}/>
                    <div className="error-message">{editErrorMessage}</div>
                </div>
            );
        }
        else {
            pairingBoardNameSection = (
                <div className="pairing-board-name-wrapper" onClick={this.props.enableEditMode}>
                    <h3 className="pairing-board-name">{name}</h3>
                    <div className="rename-pairing-board"/>
                </div>
            );
        }

        return (
            <div className="pairing-board-header">
                {pairingBoardNameSection}

                {!exempt && (
                    <div className="delete-pairing-board" onClick={this.props.deletePairingBoard}/>
                )}
            </div>
        )
    }

    onKeyDownHandler(event) {
        const EnterKeyCode = 13;
        if(event.keyCode === EnterKeyCode) {
            this.renamePairingBoard(event);
        }
    }

    renamePairingBoard(event) {
        this.props.renamePairingBoard(event.target.value);
    }
}

PairingBoardHeader.propTypes = exact({
    name: PropTypes.string.isRequired,
    exempt: PropTypes.bool.isRequired,
    editMode: PropTypes.bool.isRequired,
    editErrorMessage: PropTypes.string,
    renamePairingBoard: PropTypes.func.isRequired,
    deletePairingBoard: PropTypes.func.isRequired,
    enableEditMode: PropTypes.func.isRequired
});

export default PairingBoardHeader;