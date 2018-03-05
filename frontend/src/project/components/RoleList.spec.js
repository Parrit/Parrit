import React from 'react'
import { shallow } from 'enzyme'

import RoleList from './RoleList.js'
import Role from './Role.js'

describe('<RoleList/>', () => {
    let wrapper, props

    beforeEach(() => {
        props = {
            roles: [
                {
                    id: 1,
                    name: 'Builder'
                },
                {
                    id: 2,
                    name: 'Destroyer'
                }
            ],
            moveRole: () => {},
            deleteRole: () => {}
        }

        wrapper = shallow(<RoleList {...props} />)
    })

    it('renders all of the roles', () => {
        const roles = wrapper.find(Role)
        expect(roles.length).toBe(2)

        expect(roles.at(0).prop('id')).toBe(1)
        expect(roles.at(0).prop('name')).toBe('Builder')
        expect(roles.at(0).prop('moveRole')).toBe(props.moveRole)
        expect(roles.at(0).prop('deleteRole')).toBe(props.deleteRole)

        expect(roles.at(1).prop('id')).toBe(2)
        expect(roles.at(1).prop('name')).toBe('Destroyer')
        expect(roles.at(1).prop('moveRole')).toBe(props.moveRole)
        expect(roles.at(1).prop('deleteRole')).toBe(props.deleteRole)
    })
})
