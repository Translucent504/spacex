import React from 'react';
import { render } from '@testing-library/react';
import Launch from './Launch';

describe('<Launch />', () => {
    test('should render correct data of launch from props', () => {
        const data = {
            mission_name: 'test mission name',
            launch_date_local: 'date',
            links: {
                flickr_images: ['1', '2', '3'],
            },
            id: '12',
            launch_success: false,
        }
        const mockHandler = jest.fn()
        const component = render(<Launch handleShowDetails={mockHandler} launch={data}/>)

        const mission_name = component.container.querySelector('.mission-name')
        const launch_date = component.container.querySelector('.launch-date')
        const launch_success = component.container.querySelector('.launch-success')
        const launch_img = component.container.querySelector('.launch-img')

        expect(mission_name).toHaveTextContent(data.mission_name)
        expect(launch_date).toHaveTextContent(data.launch_date_local)
        expect(launch_img).toHaveAttribute('src',data.links.flickr_images[0])
        expect(launch_success).toHaveTextContent('Fail')


    })

})
