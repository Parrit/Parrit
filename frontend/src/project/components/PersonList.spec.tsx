import * as React from 'react'
import {PersonList} from "./PersonList";
import * as ShallowRenderer from "react-test-renderer/shallow";

describe('<PersonList/>', () => {
    let wrapper;

    beforeEach(() => {
        const people = [
            {
                id: 7,
                name: 'George'
            },
            {
                id: 88,
                name: 'Hank Muchacho'
            }
        ];

        const renderer = ShallowRenderer.createRenderer();
        renderer.render(<PersonList people={people}/>)
        wrapper = renderer.getRenderOutput();
    })

    it('renders all of the people', () => {
        const people = wrapper.props.children;
        expect(people.length).toBe(2);

        expect(people[0].props.person.id).toBe(7);
        expect(people[0].props.person.name).toBe('George');

        expect(people[1].props.person.id).toBe(88);
        expect(people[1].props.person.name).toBe('Hank Muchacho');
    })
})
