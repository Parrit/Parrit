import React from 'react'
import { shallow } from 'enzyme'

import PairingBoardHeader from './PairingBoardHeader.js'

describe('<PairingBoardHeader/>', () => {
    let wrapper, props

    beforeEach(() => {
        props  = {
            name: 'PairingBoard1',
            exempt: false,
            editMode: false,
            editErrorMessage: 'some error message',
            renamePairingBoard: jasmine.createSpy('renamePairingBoardSpy'),
            deletePairingBoard: jasmine.createSpy('deletePairingBoardSpy'),
            enableEditMode: jasmine.createSpy('movePersonSpy'),
            openNewRoleModal: jasmine.createSpy('openNewRoleModalSpy')
        }

        wrapper = shallow(<PairingBoardHeader {...props} />)
    })

    it('calls deletePairingBoard when clicking on the delete button', () => {
        wrapper.find('.delete-pairing-board').simulate('click')
        expect(props.deletePairingBoard).toHaveBeenCalled()
    })

    it('does not render a delete button when exempt is true', () => {
        props.exempt = true
        wrapper = shallow(<PairingBoardHeader {...props} />)
        expect(wrapper.find('.delete-pairing-board').exists()).toBe(false)
    })

    describe('when editMode is true', () => {
        beforeEach(() => {
            props.editMode = true
            wrapper = shallow(<PairingBoardHeader {...props} />)
        })

        it('renders an input with the name', () => {
            expect(wrapper.find('input').prop('defaultValue')).toBe('PairingBoard1')
        })

        it('renders the edit error message', () => {
            expect(wrapper.find('.error-message').text()).toEqual('some error message')
            expect(wrapper.find('input').prop('className')).toContain('error')
        })

        it('calls renamePairingBoard on blur of the input', () => {
            const event = {target: {value: 'Cheese'}}
            wrapper.find('input').simulate('blur', event)

            expect(props.renamePairingBoard).toHaveBeenCalledWith('Cheese')
        })

        it('calls renamePairingBoard when hitting the enter key', () => {
            const event = {keyCode: 13, target: {value: 'Cheese'}}
            wrapper.find('input').simulate('keyDown', event)

            expect(props.renamePairingBoard).toHaveBeenCalledWith('Cheese')
        })
    })

    describe('when editMode is false', () => {
        it('renders the name', () => {
            expect(wrapper.find('.pairing-board-name').text()).toBe('PairingBoard1')
        })

        it('renders a rename button', () => {
            expect(wrapper.find('.rename-pairing-board').exists()).toBe(true)
        })

        it('calls openNewRoleModal when clicking on the add role button', () => {
            wrapper.find('.add-role-to-pairing-board').simulate('click')
            expect(props.openNewRoleModal).toHaveBeenCalled()
        })
    })
})