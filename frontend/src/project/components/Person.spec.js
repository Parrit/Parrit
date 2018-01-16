import React from 'react'
import { mount } from 'enzyme'

import Person from './Person.js'

describe('<Person/>', () => {
    let wrapper, props

    beforeEach(() => {
        props = {
            id: 1,
            name: 'Billy',
            connectDragSource: jasmine.createSpy('connectDragSourceSpy')
        }

        props.connectDragSource.and.callFake(i => i)

        const InnerPerson = Person.DecoratedComponent
        wrapper = mount(<InnerPerson {...props} />)
    })

    it('displays the name', () => {
        expect(wrapper.text()).toBe('Billy')
    })

})