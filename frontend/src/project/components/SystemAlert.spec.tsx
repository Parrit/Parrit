import * as React from 'react'
import {SystemAlert} from "./SystemAlert";
import {render, screen} from "@testing-library/react";
import {AppContext} from "./App";
import userEvent from "@testing-library/user-event";

describe('<SystemAlert/>', () => {
    it('hides the system alert by default', () => {
        render(
            <AppContext.Provider value={{
                pairingHistoryOpen: false,
                setPairingHistoryOpen: jest.fn(),
                systemAlert: undefined,
                setSystemAlert: jest.fn()
            }}>
                <SystemAlert/>
            </AppContext.Provider>
        )

        expect(screen.getByTestId("system-alert").className).toContain("system-alert-closed");
    })

    it('displays a system alert when there is a system alert message', () => {
        const theMessage = 'Hello. Something just happened!';
        render(
            <AppContext.Provider value={{
                pairingHistoryOpen: false,
                setPairingHistoryOpen: jest.fn(),
                systemAlert: theMessage,
                setSystemAlert: jest.fn()
            }}>
                <SystemAlert/>
            </AppContext.Provider>
        )

        expect(screen.getByTestId("system-alert").className).not.toContain('system-alert-closed')
        expect(screen.getByText(theMessage)).not.toBeNull();
    })

    it('calls close when clicking the X on the alert', () => {
        const mockSetSystemAlert = jest.fn();
        render(<AppContext.Provider value={{
                pairingHistoryOpen: false,
                setPairingHistoryOpen: jest.fn(),
                systemAlert: 'Hello. Something just happened!',
                setSystemAlert: mockSetSystemAlert
            }}>
                <SystemAlert/>
            </AppContext.Provider>
        )

        userEvent.click(screen.getByRole('button'));
        expect(mockSetSystemAlert).toHaveBeenCalledWith(undefined);
    })
})