import React from 'react'
import { shallow } from 'enzyme'

import SystemAlert from './SystemAlert.js'

describe('<SystemAlert/>', () => {
    let wrapper, props
    const InnerSystemAlert = SystemAlert.WrappedComponent

    beforeEach(() => {
        props = {
            systemAlertMessage: undefined,
            close: jasmine.createSpy('closeSpy')
        }

        wrapper = shallow(<InnerSystemAlert {...props}/>)
    })

    it('hides the system alert by default', () => {
        expect(wrapper.prop('className')).toContain('system-alert-closed')
    })

    it('displays a system alert when there is a system alert message', () => {
        props.systemAlertMessage = 'Hello. Something just happened!'
        wrapper = shallow(<InnerSystemAlert {...props}/>)

        expect(wrapper.prop('className')).not.toContain('system-alert-closed')
        expect(wrapper.find('.message').text()).toBe('Hello. Something just happened!')
    })

    it('calls close when clicking the X on the alert', () => {
        props.systemAlertMessage = 'Hello. Something just happened!'
        wrapper = shallow(<InnerSystemAlert {...props}/>)

        wrapper.find('.close').simulate('click')
        expect(props.close).toHaveBeenCalled()
    })
})