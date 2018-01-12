import React from 'react';
import { shallow } from 'enzyme';

import Role from './Role.js';

describe('<Role/>', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            name: "role",
            pairingBoardIndex: 1,
            index: 1
        };

        wrapper = shallow(<Role {...props} />);
    });

    it('renders the role element with an id relative to index', () => {
        expect(wrapper.prop('id')).toBe("pairing_board_1_role_1", "Did not make correct id");
    });

    it('should have the draggable class', () => {
        expect(wrapper.prop('className')).toContain('draggable');
    });
});
