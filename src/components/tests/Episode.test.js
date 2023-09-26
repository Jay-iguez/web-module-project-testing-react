import React from "react";
import { render, fireEvent, screen, prettyDOM } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Episode from "./../Episode";

/**
 * const domTree = screen.container
    console.log(prettyDOM(domTree))
 */

const exampleTestData = {
    exampleEpisodeDataSummaryTest: {
        airdate: "2016-07-15",
        airstamp: "2016-07-15T12:00:00+00:00",
        airtime: "",
        id: 553946,
        image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
        name: "Chapter One: The Vanishing of Will Byers",
        number: 1,
        rating: { average: 8.2 },
        runtime: 49,
        season: 1,
        summary:
            "Well, this is one of the episodes of all time in my opinion. So much episode type of stuff happened it's hard to deny the episodic nature of this episode. If one want's to make an episode of their own to be a true episode, then this is your episode to have an episode on making the best episode based on this episode. So much episode in one episode.",
        type: "regular",
        url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
    },
    defaultEpisodeTestData: {
        airdate: "2016-07-15",
        airstamp: "2016-07-15T12:00:00+00:00",
        airtime: "",
        id: 553946,
        image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
        name: "Chapter One: The Vanishing of Will Byers",
        number: 1,
        rating: { average: 8.2 },
        runtime: 49,
        season: 1,
        summary:
            "A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.",
        type: "regular",
        url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
    },
    exampleEpisodeDataImageTest: {
        airdate: "2016-07-15",
        airstamp: "2016-07-15T12:00:00+00:00",
        airtime: "",
        id: 553946,
        image: null,
        name: "Chapter One: The Vanishing of Will Byers",
        number: 1,
        rating: { average: 8.2 },
        runtime: 49,
        season: 1,
        summary:
            "A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.",
        type: "regular",
        url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
    }
}


test("renders without error", () => {
    render(<Episode episode={exampleTestData.defaultEpisodeTestData} />)
});

test("renders the summary test passed as prop", () => {
    render(<Episode episode={exampleTestData.exampleEpisodeDataSummaryTest} />)
    const summaryElementByText = screen.getByText(/Well, this is one of the episodes of all time in my opinion. So much episode type of stuff happened it's hard to deny the episodic nature of this episode. If one want's to make an episode of their own to be a true episode, then this is your episode to have an episode on making the best episode based on this episode. So much episode in one episode./i)

    expect(summaryElementByText).toBeInTheDocument()
    expect(summaryElementByText).not.toBe(false)
    expect(summaryElementByText).toEqual(summaryElementByText)
});

test("renders default image when image is not defined", () => {
    render(<Episode episode={exampleTestData.exampleEpisodeDataImageTest} />)
    const nullEpisodeImage = screen.getByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png')
    const nullAltText = nullEpisodeImage.getAttribute('alt')

    expect(nullAltText).toEqual('https://i.ibb.co/2FsfXqM/stranger-things.png')
});

// ----- EXAMPLE EPISODE TEST OBJECT ----- // I placed it above lol
