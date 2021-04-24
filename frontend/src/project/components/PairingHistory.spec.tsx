import * as React from 'react'
import {PairingHistory} from "./PairingHistory";
import * as TestRenderer from 'react-test-renderer';
import {AppContext} from "./App";
import {ProjectContext} from "../ProjectContext";
import {PairingHistoryRecordList} from "./PairingHistoryRecordList";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('<PairingHistory/>', () => {
    let wrapper, pairingHistory, appContext, projectContext

    beforeEach(() => {
        appContext = {
            pairingHistoryOpen: false,
            setPairingHistoryOpen: jest.fn(),
            setSystemAlert: () => {}
        };

        pairingHistory = [
            {
                pairingTime: '2016-03-08T17:30:00.000+0000',
                pairingHistories: [
                    {pairingBoardName: 'board1', people: [{name: 'joe'}, {name: 'tom'}]},
                    {pairingBoardName: 'board2', people: [{name: 'bob'}]}
                ]
            },
            {
                pairingTime: '2016-03-07T17:30:00.000+0000',
                pairingHistories: [{
                    pairingBoardName: 'board1',
                    people: [{name: 'jim'}, {name: 'billy'}, {name: 'bobby'}]
                }]
            }
        ];
        projectContext = {pairingHistory: pairingHistory}

        wrapper = TestRenderer.create(
            <AppContext.Provider value={appContext}>
                <ProjectContext.Provider value={projectContext}>
                    <PairingHistory />
                </ProjectContext.Provider>
            </AppContext.Provider>
        ).root;
    })

    describe('when the pairingHistoryList has content', () => {
        it('renders the pairing history records', () => {
            expect(wrapper.findByType(PairingHistoryRecordList).props.pairingHistoryList).toEqual(pairingHistory);
        })
    })

    describe('when the pairingHistoryList is empty', () => {
        beforeEach(() => {
            projectContext.pairingHistory = []
            wrapper = TestRenderer.create(
                <AppContext.Provider value={appContext}>
                    <ProjectContext.Provider value={projectContext}>
                        <PairingHistory />
                    </ProjectContext.Provider>
                </AppContext.Provider>
            ).root;
        })

        it('renders the no-history display text', () => {
            expect(wrapper.findByProps({className: 'no-history-content'}).children).toContain('‘Record Pairs’ to track daily rotation history. The more you record, the better the recommendation engine becomes.')
        })
    })

    it('displays the pairing history panel when isPairingHistoryPanelOpen is true', () => {
        appContext.pairingHistoryOpen = true;
        const testInstance = TestRenderer.create(
            <AppContext.Provider value={appContext}>
                <ProjectContext.Provider value={projectContext}>
                    <PairingHistory />
                </ProjectContext.Provider>
            </AppContext.Provider>
        ).root;

        expect(testInstance.findByProps({className: 'pairing-history-panel panel-open'})).toBeTruthy()
    })

    it('#closePairingHistoryPanel calls setPairingHistoryPanelOpen with false', () => {
        appContext.pairingHistoryOpen = true;
        render(
            <AppContext.Provider value={appContext}>
                <ProjectContext.Provider value={projectContext}>
                    <PairingHistory />
                </ProjectContext.Provider>
            </AppContext.Provider>
        );

        userEvent.click(screen.getByLabelText('close history'));

        expect(appContext.setPairingHistoryOpen).toHaveBeenCalledWith(false)
    })
})