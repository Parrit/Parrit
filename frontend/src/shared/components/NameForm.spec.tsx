import * as React from 'react'
import * as renderer from 'react-test-renderer';
import NameForm from "./NameForm";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('<NameForm/>', () => {
    let props;

    beforeEach(() => {
        props = {
            formTitle: 'Form Title',
            confirmFunction: jasmine.createSpy('confirmFunctionSpy'),
            cancelFunction: jasmine.createSpy('cancelFunctionSpy'),
            errorMessage: 'ERROR'
        }
    })

    it('should render correctly', () => {
        const tree = renderer.create(<NameForm {...props}/>)
        expect(tree).toMatchSnapshot();
    })

    describe('submit', () => {
        it('should call the confirm function with the name entered', () => {
            render(<NameForm {...props} />)
            userEvent.type(screen.getByPlaceholderText("Name"), 'stuff');
            userEvent.click(screen.getByText('OK'));
            expect(props.confirmFunction).toHaveBeenCalledWith('stuff')
        })

        it('should call the confirm function with the name entered', () => {
            render(<NameForm {...props} />)
            let input = screen.getByPlaceholderText("Name");
            userEvent.type(input, 'stuff');
            userEvent.type(input, '{enter}');
            expect(props.confirmFunction).toHaveBeenCalledWith('stuff')
        })

        it('should call the cancel function without saving when user click cancel', () => {
            render(<NameForm {...props} />)
            userEvent.type(screen.getByPlaceholderText("Name"), 'stuff');
            userEvent.click(screen.getByText('Cancel'));
            expect(props.confirmFunction).not.toHaveBeenCalled();
            expect(props.cancelFunction).toHaveBeenCalled();
        })
    })
})