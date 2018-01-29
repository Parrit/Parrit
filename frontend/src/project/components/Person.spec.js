import React from 'react'
import { shallow } from 'enzyme'
import { getEmptyImage } from 'react-dnd-html5-backend'

import Person from './Person.js'

describe('<Person/>', () => {
    let wrapper, props
    const InnerPerson = Person.DecoratedComponent

    beforeEach(() => {
        props = {
            id: 1,
            name: 'Billy',
            isDragging: false,
            connectDragSource: jasmine.createSpy('connectDragSourceSpy'),
            connectDragPreview: jasmine.createSpy('connectDragPreviewSpy')
        }

        props.connectDragSource.and.callFake(i => i)

        wrapper = shallow(<InnerPerson {...props} />)
    })

    it('displays the name', () => {
        expect(wrapper.text()).toBe('Billy')
    })

    it('sets an enmpty image as the drag preview', () => {
        expect(props.connectDragPreview).toHaveBeenCalledWith(getEmptyImage())
    })

    it('renders nothing when being dragged', () => {
        props.isDragging = true
        wrapper = shallow(<InnerPerson {...props} />)

        expect(wrapper.type()).toBe(null)
    })

})