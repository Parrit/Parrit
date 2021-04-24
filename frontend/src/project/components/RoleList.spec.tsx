import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow';
import RoleList from "./RoleList";

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
        const roles = [
            {
                id: 1,
                name: 'Builder'
            },
            {
                id: 2,
                name: 'Destroyer'
            }
        ];

        const renderer = ShallowRenderer.createRenderer();
        renderer.render(<RoleList  roles={roles}/>)
        wrapper = renderer.getRenderOutput();
    })

    it('renders all of the roles', () => {
        const roles = wrapper.props.children
        expect(roles.length).toBe(2)

        expect(roles[0].props.role.id).toBe(1)
        expect(roles[0].props.role.name).toBe('Builder')

        expect(roles[1].props.role.id).toBe(2)
        expect(roles[1].props.role.name).toBe('Destroyer')
    })
})
