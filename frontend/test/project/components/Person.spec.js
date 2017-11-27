import React from 'react';
import { shallow } from 'enzyme';

import Person from 'project/components/Person.js';

describe('<Person/>', () => {
    let wrapper, props;

    beforeEach(() => {
        props = {
            name: "person",
            pairingBoardIndex: 1,
            index: 1
        };

        wrapper = shallow(<Person {...props} />);
    });

    it('renders the person element with an id relative to index', () => {
        expect(wrapper.prop('id')).toBe("pairing_board_1_person_1", "Did not make correct id");
    });

    it('should have the draggable class', () => {
        expect(wrapper.prop('className')).toContain('draggable');
    });
});