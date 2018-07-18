import React from 'react'
import { shallow } from 'enzyme'

import App from './App.js'
import SystemAlert from './SystemAlert.js'
import Header from './Header.js'
import Project from './Project.js'
import PairingHistory from './PairingHistory.js'

describe('<App/>', () => {
    let wrapper, props
    const InnerApp = App.DecoratedComponent.WrappedComponent

    beforeEach(() => {
        props = {
            settings: {
                pairingHistoryPanel: {
                    isOpen: true
                }
            },
            connectDropTarget: jasmine.createSpy('connectDropTargetSpy')
        }

        props.connectDropTarget.and.callFake(i => i)

        wrapper = shallow(<InnerApp {...props}/>)
    })

    it('adds the shift-left class on itself if isPairingHistoryPanelOpen is true', () => {
        expect(wrapper.find('.shift-left').exists()).toBeTruthy()
    })

    it('has a SystemAlert component', () => {
        const systemAlertComponent = wrapper.find(SystemAlert)
        expect(systemAlertComponent.exists()).toBeTruthy()
    })

    it('has a Header component', () => {
        const headerComponent = wrapper.find(Header)
        expect(headerComponent.exists()).toBeTruthy()
    })

    it('has a Project component', () => {
        const projectComponent = wrapper.find(Project)
        expect(projectComponent.exists()).toBeTruthy()
    })

    it('has a Footer component', () => {
        const footerComponent = wrapper.find('Footer')
        expect(footerComponent.exists()).toBeTruthy()
    })

    it('has a PairingHistory component', () => {
        const pairingHistoryComponent = wrapper.find(PairingHistory)
        expect(pairingHistoryComponent.exists()).toBeTruthy()
    })
})
