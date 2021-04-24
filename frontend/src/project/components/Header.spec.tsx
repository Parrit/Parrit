import * as React from 'react'
import {Header} from "./Header";
import {AppContext} from "./App";
import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";

describe('<Header/>', () => {
    let appContext = {
        pairingHistoryOpen: false,
        setPairingHistoryOpen: jest.fn(),
        setSystemAlert: () => {}
    };

    it('renders a left caret when isPairingHistoryPanelOpen is false', () => {
        render(
            <AppContext.Provider value={appContext}>
                <Header/>
            </AppContext.Provider>
        );

        expect(screen.getByLabelText('open history panel')).not.toBeNull();
        expect(screen.queryByLabelText('close history panel')).toBeNull();

    });

    it('renders a right caret when isPairingHistoryPanelOpen is true', () => {
        appContext.pairingHistoryOpen = true;
        render(
            <AppContext.Provider value={appContext}>
                <Header/>
            </AppContext.Provider>
        );
        expect(screen.getByLabelText('close history panel')).not.toBeNull();
        expect(screen.queryByLabelText('open history panel')).toBeNull();

    })

    it('calls setPairingHistoryPanelOpen with true when clicking on the history label and isPairingHistoryPanelOpen is false', () => {
        appContext.pairingHistoryOpen = false;
        render(
            <AppContext.Provider value={appContext}>
                <Header/>
            </AppContext.Provider>
        );

        userEvent.click(screen.getByText('HISTORY'));
        expect(appContext.setPairingHistoryOpen).toHaveBeenCalledWith(true)
    })

    it('calls setPairingHistoryPanelOpen with false when clicking on the history label and isPairingHistoryPanelOpen is true', () => {
        appContext.pairingHistoryOpen = true;

        render(
            <AppContext.Provider value={appContext}>
                <Header/>
            </AppContext.Provider>
        );

        userEvent.click(screen.getByText('HISTORY'));
        expect(appContext.setPairingHistoryOpen).toHaveBeenCalledWith(false)
    })
})