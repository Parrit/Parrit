import React from 'react'
import { shallow } from 'enzyme'

import Project from './Project.js'
import Workspace from './Workspace.js'

describe('<Project/>', () => {
    let wrapper
    const InnerProject = Project.WrappedComponent

    const props = {
        data: {
            project: {
                name: 'The Best Around'
            }
        },
        resetPairs: () => {},
        getRecommendedPairs: () => {},
        savePairing: () => {}
    }

    beforeEach(() => {
        wrapper = shallow(<InnerProject {...props} />)
    })

    it('displays the project name', () => {
        expect(wrapper.find('.project-name').text()).toBe('The Best Around')
    })

    it('has a reset pairs button', () => {
        const allButtons = wrapper.find('Button')
        const recommendPairsButton = allButtons.at(0)

        expect(recommendPairsButton.prop('className')).toBe('button-blue')
        expect(recommendPairsButton.prop('name')).toBe('Reset Pairs')
        expect(recommendPairsButton.prop('shortName')).toBe('Reset')
        expect(recommendPairsButton.prop('clickFunction')).toBe(props.resetPairs)
    })

    it('has a recommend pairs button', () => {
        const allButtons = wrapper.find('Button')
        const recommendPairsButton = allButtons.at(1)

        expect(recommendPairsButton.prop('className')).toBe('button-blue')
        expect(recommendPairsButton.prop('name')).toBe('Recommend Pairs')
        expect(recommendPairsButton.prop('shortName')).toBe('Recommend')
        expect(recommendPairsButton.prop('clickFunction')).toBe(props.getRecommendedPairs)
    })

    it('has a records pairs button', () => {
        const allButtons = wrapper.find('Button')
        const recordPairs = allButtons.at(2)

        expect(recordPairs.prop('className')).toBe('button-green')
        expect(recordPairs.prop('name')).toBe('Record Pairs')
        expect(recordPairs.prop('shortName')).toBe('Record')
        expect(recordPairs.prop('clickFunction')).toBe(props.savePairing)
    })

    it('has a Workspace component as a child', () => {
        const workspaceComponent = wrapper.find(Workspace)
        expect(workspaceComponent.exists()).toBeTruthy()
    })
})
