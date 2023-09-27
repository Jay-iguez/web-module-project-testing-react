import React from 'react';
import { render, fireEvent, screen, prettyDOM, rerender, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

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


test('renders without errors', () => {
    render(<Show show={testShow} selectedSeason={'none'} />)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} selectedSeason={'none'} />)
    const loadingMessage = screen.getByTestId('loading-container')

    expect(loadingMessage).toBeInTheDocument()
});

test('renders same number of options seasons are passed in', () => {
    render(<Show show={testShow} selectedSeason={'none'} />)
    const selectSeasonCombobox = screen.getByRole('combobox')
    const amountOfOptions = screen.getAllByRole('option', { container: selectSeasonCombobox })

    expect(amountOfOptions).toHaveLength(testShow.seasons.length + 1) // 1 being the extra empty value from section
});

test('handleSelect is called when an season is selected', () => {
    const handleSelectMock = jest.fn()
    render(<Show show={testShow} selectedSeason={'none'} handleSelect={handleSelectMock} />)
    const selectSeasonCombobox = screen.getByRole('combobox')

    fireEvent.change(selectSeasonCombobox, { target: { value: '1' } })

    expect(handleSelectMock).toBeCalled()
});

test('component renders when no seasons are selected and when rerenders with a season passed in', async () => { 
    const handleSelectMock = jest.fn()
    const {queryByTestId, getByTestId, rerender} = render(<Show show={testShow} selectedSeason={'none'} handleSelect={handleSelectMock} />)

    await waitFor(() => {
        expect(queryByTestId(/episodes-container/i)).toBe(null)
    })

    rerender(<Show show={testShow} selectedSeason={1} handleSelect={handleSelectMock} />)
    await waitFor(() => {
        expect(getByTestId(/episodes-container/i)).toBeInTheDocument()
    })
   
});
