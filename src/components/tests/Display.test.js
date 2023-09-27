import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import mockFetchShow from '../../api/fetchShow';

const testShow = {
    name: "Stranger Things",
    image: {
        medium: "https://static.tvmaze.com/uploads/images/medium_portrait/396/991288.jpg",
        original: "https://static.tvmaze.com/uploads/images/original_untouched/396/991288.jpg"
    },
    summary: "A love letter to the '80s classics that captivated a generation, Stranger Things is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.",
    seasons: [
        {
            id: 0,
            name: "Season 1",
            episodes: []
        },
        {
            id: 1,
            name: "Season 2",
            episodes: []
        },
        {
            id: 2,
            name: "Season 3",
            episodes: []
        },
        {
            id: 3,
            name: "Season 4",
            episodes: []
        }
    ]
};

test('renders without errors with no props', async () => { 
    render(<Display />)
});

test('renders Show component when the button is clicked ', async () => { 
    render(<Display />)
    const fetchButton = screen.getByText('Press to Get Show Data')

    fireEvent.click(fetchButton)

    await waitFor(() => {
        const showContainer = screen.getByTestId('show-container')
        expect(showContainer).toBeInTheDocument()
    })
});

test('renders show season options matching your data when the button is clicked', async () => { 
    render(<Display />)
    const fetchButton = screen.getByText('Press to Get Show Data')

    fireEvent.click(fetchButton)

    await waitFor(() => {
        const allOptionValues = screen.queryAllByTestId('season-option')
        expect(allOptionValues).toHaveLength(testShow.seasons.length + 1) // Accounts for empty value
    })
});

test('Function displayFunc passed as prop is called when Show component is rendered on click', async () => {
    const mockDisplayFunc = jest.fn()
    render(<Display displayFunc={mockDisplayFunc} />)

    const fetchButton = screen.getByText('Press to Get Show Data')

    fireEvent.click(fetchButton)

    await waitFor(() => {
        expect(mockDisplayFunc).toBeCalled()
    })
})
