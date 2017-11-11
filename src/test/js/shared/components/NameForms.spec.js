import React from 'react';
import { shallow } from 'enzyme';

import NameForm from 'shared/components/NameForm.js';

describe('<NameForm/>', () => {
    let wrapper, props;

    beforeEach(() => {
        props  = {
            formTitle: "Form Title",
            confirmFunction: jasmine.createSpy('confirmFunctionSpy'),
            cancelFunction: jasmine.createSpy('cancelFunctionSpy'),
            errorMessage: 'ERROR'
        };

        wrapper = shallow(<NameForm {...props} />);
    });

    it('displays the form title', () => {
        expect(wrapper.find('.form-title').text()).toBe("Form Title");
    });

    it('has a cancel button', () => {
        expect(wrapper.find('.form-cancel').exists()).toBeTruthy();
    });

    it('has an input field', () => {
        expect(wrapper.find('input')).toBeTruthy();
    });

    it('displays the error message', () => {
        expect(wrapper.find('.error-message').text()).toBe('ERROR');
    });

    describe('#submit', () => {
        let event;

        beforeEach(() => {
            event = {preventDefault: jasmine.createSpy('preventDefaultSpy')};
        });

        it('calls prevent default', () => {
            wrapper.setState({name: "stuff"});
            wrapper.simulate('submit', event);
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('should call the confirm function with the name on the state', () => {
            wrapper.setState({name: "stuff"});
            wrapper.simulate('submit', event);
            expect(props.confirmFunction).toHaveBeenCalledWith('stuff');
        });
    });
});