import React from 'react';
import { shallow } from 'enzyme';

import RoleList from './RoleList.js';

describe('<RoleList/>', () => {
    it('renders all of the roles', () => {
        const props = {
            roles: [
                {
                    name: "Builder"
                },
                {
                    name: "Destroyer"
                }
            ],
            index: 1
        };

        const wrapper = shallow(<RoleList {...props} />);

        const roles = wrapper.find('Role');
        expect(roles.length).toBe(2, 'Not enough roles');

        expect(roles.at(0).prop('name')).toBe("Builder");
        expect(roles.at(0).prop('index')).toBe(0);
        expect(roles.at(0).prop('pairingBoardIndex')).toBe(1);

        expect(roles.at(1).prop('name')).toBe("Destroyer");
        expect(roles.at(1).prop('index')).toBe(1);
        expect(roles.at(1).prop('pairingBoardIndex')).toBe(1);
    });

    it('can render two roles with the same name', () => {
        const props = {
            roles: [
                {
                    name: "Destroyer"
                },
                {
                    name: "Destroyer"
                }
            ],
            index: 1
        };

        const wrapper = shallow(<RoleList {...props} />);

        const roles = wrapper.find('Role');
        expect(roles.length).toBe(2, 'Not enough roles');

        expect(roles.at(0).prop('name')).toBe("Destroyer");
        expect(roles.at(0).prop('index')).toBe(0);
        expect(roles.at(0).prop('pairingBoardIndex')).toBe(1);

        expect(roles.at(1).prop('name')).toBe("Destroyer");
        expect(roles.at(1).prop('index')).toBe(1);
        expect(roles.at(1).prop('pairingBoardIndex')).toBe(1);
    });
});
