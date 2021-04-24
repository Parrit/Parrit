import * as React from 'react'
import {wrapWithTestBackend} from "react-dnd-test-utils";
import * as TestRenderer from 'react-test-renderer';
import {Person} from "./Person";

describe('<Person/>', () => {
    it('displays the name', () => {
        const [PersonContent, _] = wrapWithTestBackend<typeof Person>(Person);
        const root = TestRenderer.create(<PersonContent person={{id: 1, name: 'Billy'}}/>).root;

        expect(root.findByProps({className: 'person'}).props.children).toBe('Billy');
    })

})