import React from 'react'
import { shallow } from 'enzyme'
import { getEmptyImage } from 'react-dnd-html5-backend'

import Role from './Role.js'

describe('<Role/>', () => {
    let wrapper, props
    const InnerRole = Role.DecoratedComponent

    beforeEach(() => {
        props = {
            id: 1,
            name: 'Ballers',
            isDragging: false,
            moveRole: jasmine.createSpy('moveRoleSpy'),
            deleteRole: jasmine.createSpy('deleteRoleSpy'),
            connectDragSource: jasmine.createSpy('connectDragSourceSpy'),
            connectDragPreview: jasmine.createSpy('connectDragPreviewSpy')
        }

        props.connectDragSource.and.callFake(i => i)

        wrapper = shallow(<InnerRole {...props} />)
    })

    it('displays the name', () => {
        expect(wrapper.text()).toBe('Ballers')
    })

    it('sets an empty image as the drag preview', () => {
        expect(props.connectDragPreview).toHaveBeenCalledWith(getEmptyImage())
    })

    it('renders nothing when being dragged', () => {
        props.isDragging = true
        wrapper = shallow(<InnerRole {...props} />)

        expect(wrapper.type()).toBe(null)
    })
})
