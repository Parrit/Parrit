import React from 'react'
import { shallow } from 'enzyme'

import Header from './Header.js'

describe('<Header/>', () => {
    let wrapper, props

    beforeEach(() => {
        props = {
            setPairingHistoryPanelOpen: jasmine.createSpy('setPairingHistoryPanelOpenSpy'),
            isPairingHistoryPanelOpen: false,
            postLogout: jasmine.createSpy('postLogoutSpy')
        }

        wrapper = shallow(<Header {...props}/>)
    })

    it('renders a left caret when isPairingHistoryPanelOpen is false', () => {
        expect(wrapper.find('.history-caret-left').exists()).toBeTruthy()
    })

    it('renders a right caret when isPairingHistoryPanelOpen is true', () => {
        props.isPairingHistoryPanelOpen = true
        wrapper = shallow(<Header {...props}/>)

        expect(wrapper.find('.history-caret-right').exists()).toBeTruthy()
    })

    it('calls setPairingHistoryPanelOpen with true when clicking on the history label and isPairingHistoryPanelOpen is false', () => {
        wrapper.find('.history').simulate('click')
        expect(props.setPairingHistoryPanelOpen).toHaveBeenCalledWith(true)
    })

    it('calls setPairingHistoryPanelOpen with false when clicking on the history label and isPairingHistoryPanelOpen is true', () => {
        props.isPairingHistoryPanelOpen = true
        wrapper = shallow(<Header {...props}/>)

        wrapper.find('.history').simulate('click')
        expect(props.setPairingHistoryPanelOpen).toHaveBeenCalledWith(false)
    })
})