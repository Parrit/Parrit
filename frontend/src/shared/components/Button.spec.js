import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button.js';

describe('<Button/>', () => {
    describe('#createButtonClass', () => {
        let wrapper, props;

        beforeEach(() => {
            props = {
                name: 'button',
                className: 'ooga-booga'
            };

            wrapper = shallow(<Button {...props} />);
        });

        it('should have the passed in css classes', () => {
            expect(wrapper.prop('className')).toContain('ooga-booga');
        });

        it('should have a button type', () => {
            expect(wrapper.prop('type')).toBe('button');
        });

        it('should use the passed in button type if provided', () => {
            props.type = 'submit';
            wrapper = shallow(<Button {...props} />);
            expect(wrapper.prop('type')).toBe('submit');
        });

        it('should call the click function when clicked if provided', () => {
            props.clickFunction = jasmine.createSpy('clickFunctionSpy');
            wrapper = shallow(<Button {...props} />);

            wrapper.simulate('click');
            expect(props.clickFunction).toHaveBeenCalled();
        });

        it('should display the alternate short name given', () => {
            props.shortName = 'short';
            wrapper = shallow(<Button {...props} />);

            expect(wrapper.find('.short-name').text()).toBe("short");
        });

        it('defaults short name to the name property when no short name is provided', () => {
            expect(wrapper.find('.short-name').text()).toBe("button");
        });
    });
});