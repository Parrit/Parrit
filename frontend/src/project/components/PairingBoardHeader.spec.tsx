import * as React from 'react'
import PairingBoardHeader from "./PairingBoardHeader";
import {fireEvent, render, screen} from '@testing-library/react';
import {WorkspaceContext} from "./Workspace";
import userEvent from '@testing-library/user-event'

describe('<PairingBoardHeader/>', () => {
    let props;

    beforeEach(() => {
        props = {
            name: 'PairingBoard1',
            exempt: false,
            editMode: false,
            editErrorMessage: 'some error message',
            renamePairingBoard: jasmine.createSpy('renamePairingBoardSpy'),
            deletePairingBoard: jasmine.createSpy('deletePairingBoardSpy'),
            enableEditMode: jasmine.createSpy('movePersonSpy'),
            openNewRoleModal: jasmine.createSpy('openNewRoleModalSpy'),
            setEditing: jest.fn(),
            pairingBoard: {id: 1}
        }
    });

    it('calls deletePairingBoard when clicking on the delete button', () => {
        render(
            <WorkspaceContext.Provider value={{setNewRoleOpen: jest.fn()}}>
                <PairingBoardHeader {...props} />
            </WorkspaceContext.Provider>
        )
        userEvent.click(screen.getByLabelText('delete pairing board'));
        expect(props.deletePairingBoard).toHaveBeenCalled()
    });

    it('does not render a delete button when exempt is true', () => {
        props.exempt = true
        render(
            <WorkspaceContext.Provider value={{setNewRoleOpen: jest.fn()}}>
                <PairingBoardHeader {...props} />
            </WorkspaceContext.Provider>
        )
        expect(screen.queryByLabelText('delete pairing board')).toBeNull();
    });

    describe('when editMode is true', () => {
        beforeEach(() => {
            props.editMode = true
            render(
                <WorkspaceContext.Provider value={{setNewRoleOpen: jest.fn()}}>
                    <PairingBoardHeader {...props} />
                </WorkspaceContext.Provider>
            )
        })

        it('renders an input with the name', () => {
            const input = screen.getByLabelText('pairing board name')
            // @ts-ignore
            expect(input.value).toBe('PairingBoard1')
        })

        it('renders the edit error message', () => {
            const errorMessage = screen.getByLabelText('pairing board name error');
            expect(errorMessage.textContent).toBe(props.editErrorMessage);
            expect(errorMessage.className).toContain('error-message');
        })

        it('calls renamePairingBoard on blur of the input', () => {
            const input = screen.getByLabelText('pairing board name')
            userEvent.clear(input);
            userEvent.type(input, 'Cheese');
            fireEvent.blur(input);

            expect(props.renamePairingBoard).toHaveBeenCalledWith('Cheese')
        })

        it('calls renamePairingBoard when hitting the enter key', () => {
            const input = screen.getByLabelText('pairing board name')
            userEvent.clear(input);
            userEvent.type(input, 'Cheese');
            userEvent.type(input, '{enter}');

            expect(props.renamePairingBoard).toHaveBeenCalledWith('Cheese')
        })
    })

    describe('when editMode is false', () => {
        const mockSetNewRoleOpen = jest.fn();
        beforeEach(() => {
            render(
                <WorkspaceContext.Provider value={{setNewRoleOpen: mockSetNewRoleOpen}}>
                    <PairingBoardHeader {...props} />
                </WorkspaceContext.Provider>
            )
        });

        it('renders the name', () => {
            const pairingBoardName = screen.getByLabelText('pairing board name')

            expect(pairingBoardName.textContent).toBe('PairingBoard1')
        })

        it('renders a rename button', () => {
            expect(screen.queryByLabelText('rename pairing board')).not.toBeNull()
        })

        it('calls openNewRoleModal when clicking on the add role button', () => {
            userEvent.click(screen.getByLabelText('add role to pairing board'));
            expect(mockSetNewRoleOpen).toHaveBeenCalledWith(true, props.pairingBoard);
        })
    })
})