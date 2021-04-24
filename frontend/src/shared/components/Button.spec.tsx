import * as React from 'react'
import * as renderer from 'react-test-renderer';
import {Button} from "./Button";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('<Button/>', () => {
    let props;

    beforeEach(() => {
        props = {
            name: 'button',
            className: 'ooga-booga'
        }
    })

    it('should render correctly', () => {
        const tree = renderer.create(<Button name='button' className='ooga-booga'/>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('should use the passed in button type and short name if provided', () => {
        props.type = 'submit'
        props.shortName = 'short'
        const tree = renderer.create(<Button {...props} />)
        expect(tree).toMatchSnapshot();
    })

    it('should call the click function when clicked if provided', () => {
        props.clickFunction = jest.fn();
        render(<Button {...props} />)

        userEvent.click(screen.getByLabelText(props.name))
        expect(props.clickFunction).toHaveBeenCalled()
    })
})