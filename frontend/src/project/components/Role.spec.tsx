import *  as React from 'react'
import {Role} from "./Role";
import {wrapWithTestBackend} from "react-dnd-test-utils";
import * as TestRenderer from 'react-test-renderer';

describe('<Role/>', () => {
    it('displays the name', () => {
        const [RoleContent, _] = wrapWithTestBackend<typeof Role>(Role)
        const root = TestRenderer.create(<RoleContent role={{id: 1, name: 'Ballers'}}/>).root;

        expect(root.findByProps({className: 'role'}).props.children).toBe('Ballers');
    })
})
